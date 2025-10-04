// import { Table, Button, Popconfirm } from "antd";
// import { Image as AntImage } from "antd";
// import styles from "./ResultsTable.module.scss";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import { FaCloudDownloadAlt } from "react-icons/fa";
// import Gerb from "../../../../assets/img/gerb.jpg";
// import type { ColumnsType } from "antd/es/table";
// import DejaVuTTF from "../../../../assets/fonts/DejaVuSans.ttf?url";

// export interface ResultRow {
//   id: string | number;
//   photoUrl?: string;
//   name: string;
//   lavozim?: string;
//   unvon?: string;
//   score: number;
//   shots: number[];
// }

// const splitShots = (shots: number[] = []) => {
//   const test = shots.slice(0, 3);
//   const last = shots.slice(3);
//   return { test, last };
// };

// const toDataUrl = async (src?: string): Promise<string | undefined> => {
//   if (!src) return undefined;
//   if (src.startsWith("data:image")) return src;
//   try {
//     const res = await fetch(src);
//     const blob = await res.blob();
//     return await new Promise((resolve) => {
//       const reader = new FileReader();
//       reader.onloadend = () => resolve(reader.result as string);
//       reader.readAsDataURL(blob);
//     });
//   } catch {
//     return undefined;
//   }
// };

// const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
//   const bytes = new Uint8Array(buffer);
//   let binary = "";
//   for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
//   return btoa(binary);
// };

// const ensureUnicodeFont = async (doc: jsPDF) => {
//   try {
//     const fontUrl = DejaVuTTF || "/fonts/DejaVuSans.ttf";
//     const res = await fetch(fontUrl);
//     if (!res.ok) return false;
//     const buf = await res.arrayBuffer();
//     const base64 = arrayBufferToBase64(buf);
//     doc.addFileToVFS("DejaVuSans.ttf", base64);
//     doc.addFont("DejaVuSans.ttf", "DejaVuSans", "normal");
//     doc.setFont("DejaVuSans", "normal");
//     return true;
//   } catch {
//     return false;
//   }
// };

// const chunkArray = (arr: number[], size: number) => {
//   const out: string[] = [];
//   for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size).join(", "));
//   return out;
// };

// export default function ResultsTable({
//   results,
//   setResults,
// }: {
//   results: ResultRow[];
//   setResults: React.Dispatch<React.SetStateAction<ResultRow[]>>;
// }) {
//   const handleDelete = (id: string | number) => {
//     const updated = results.filter((r) => r.id !== id);
//     setResults(updated);
//   };

//   const handleDownloadAllPDF = async () => {
//     const doc = new jsPDF({ unit: "pt", format: "a4" });
//     const ok = await ensureUnicodeFont(doc);

//     const pageWidth = doc.internal.pageSize.getWidth();
//     const marginX = 20;
//     const tableMaxWidth = pageWidth - marginX * 2;

//     const emblem = new Image();
//     emblem.src = Gerb as unknown as string;
//     await new Promise<void>((resolve) => {
//       emblem.onload = () => resolve();
//       emblem.onerror = () => resolve();
//     });

//     const imgWidth = 25;
//     const imgHeight = 25;
//     const y = 10;
//     const x = (pageWidth - imgWidth) / 2;

//     try {
//       doc.addImage(emblem, "JPG", x, y, imgWidth, imgHeight);
//     } catch { }

//     doc.setLineHeightFactor(1.3);
//     if (ok) doc.setFont("DejaVuSans", "normal");

//     doc.setFontSize(12);
//     doc.text("O‘ZBEKISTON RESPUBLIKASI ICHKI ISHLAR VAZIRLIGI", pageWidth / 2, y + imgHeight + 8, { align: "center" });
//     doc.text("MA'NAVIY-MA'RIFIY ISHLAR VA KADRLAR BILAN TA'MINLASH DEPARTAMENTI", pageWidth / 2, y + imgHeight + 34, { align: "center" });

//     doc.setFontSize(9);
//     doc.text(
//       "100029, Toshkent shahri, Yunus Rajabiy ko'chasi, 1-uy. web: www.gov.uz/iiv, e-mail: info@iiv.uz, exat: iiv@exat.uz",
//       pageWidth / 2,
//       y + imgHeight + 52,
//       { align: "center" }
//     );

//     doc.setDrawColor(0, 0, 255);
//     doc.setLineWidth(0.8);
//     doc.line(marginX, y + imgHeight + 58, pageWidth - marginX, y + imgHeight + 58);

//     const head = [["Id", "Rasm", "F.I.O", "Lavozim", "Unvon", "Umumiy", "Test", "Last"]];

//     const photoMap = new Map<any, string | undefined>();
//     for (const r of results) {
//       const dataUrl = await toDataUrl(r.photoUrl);
//       photoMap.set(r.id, dataUrl);
//     }

//     const startY = y + imgHeight + 66 + 50;

//     const wId = 25;
//     const wPhoto = 40;
//     const wName = 100;
//     const wLavozim = 80;
//     const wUnvon = 70;
//     const wScore = 45;
//     const wTest = 90;
//     const usedWidth = wId + wPhoto + wName + wLavozim + wUnvon + wScore + wTest;
//     const wLast = tableMaxWidth - usedWidth - 5;

//     const body = results.map((r) => {
//       const { test, last } = splitShots(r.shots || []);
//       const testStr = test.join(", ");
//       const lastStr = last.join(", ");
//       const testLines = doc.splitTextToSize(testStr, wTest - 8);
//       const lastLines = doc.splitTextToSize(lastStr, wLast - 8);
//       return [
//         String(r.id ?? "").slice(0, 3),
//         "",
//         String(r.name ?? ""),
//         String(r.lavozim ?? ""),
//         String(r.unvon ?? ""),
//         String(r.score ?? ""),
//         testLines,
//         lastLines,
//       ];
//     });

//     autoTable(doc, {
//       startY,
//       head,
//       body,
//       margin: { left: marginX, right: marginX },
//       tableWidth: tableMaxWidth,
//       styles: {
//         font: ok ? "DejaVuSans" : undefined,
//         fontSize: 7,
//         cellPadding: { top: 3, right: 4, bottom: 3, left: 4 },
//         halign: "left",
//         valign: "top",
//         overflow: "linebreak",
//         cellWidth: "wrap",
//         minCellHeight: 10,
//       },
//       headStyles: {
//         fillColor: [255, 255, 255],
//         textColor: [0, 0, 0],
//         fontStyle: "normal",
//       },
//       columnStyles: {
//         0: { cellWidth: wId },
//         1: { cellWidth: wPhoto },
//         2: { cellWidth: wName },
//         3: { cellWidth: wLavozim },
//         4: { cellWidth: wUnvon },
//         5: { cellWidth: wScore, halign: "right" },
//         6: { cellWidth: wTest },
//         7: { cellWidth: wLast },
//       },
//       didParseCell: (data: any) => {
//         if (data.section === "body" && data.column.index === 1) data.cell.text = [];
//       },
//       didDrawCell: (data: any) => {
//         if (data.section === "body" && data.column.index === 1) {
//           const rowIdx = data.row.index;
//           const r = results[rowIdx];
//           const dataUrl = photoMap.get(r.id);
//           if (dataUrl) {
//             const { x, y, height } = data.cell;
//             const size = Math.min(25, height - 4);
//             try {
//               doc.addImage(dataUrl, "JPEG", x + 2, y + (height - size) / 2, size, size);
//             } catch { }
//           }
//         }
//       },
//     });

//     doc.save("natijalar.pdf");
//   };

//   const columns: ColumnsType<ResultRow> = [
//     {
//       title: "Id",
//       dataIndex: "id",
//       key: "id",
//       width: 70,
//       onCell: () => ({ className: styles.wrapCell }),
//       render: (v: string | number) => (
//         <div className={styles.wrapCellInner}>{String(v).slice(0, 3)}</div>
//       ),
//     },
//     {
//       title: "Rasm",
//       dataIndex: "photoUrl",
//       key: "photo",
//       width: 80,
//       render: (src: string | undefined) =>
//         src ? (
//           <AntImage
//             src={src}
//             alt="user"
//             width={48}
//             height={48}
//             style={{ objectFit: "cover", borderRadius: 6 }}
//             preview={false}
//           />
//         ) : (
//           <div style={{ width: 38, height: 38, background: "#eee", borderRadius: 6 }} />
//         ),
//     },
//     {
//       title: "Ism (F.I.O)",
//       dataIndex: "name",
//       key: "name",
//       width: 180,
//       onCell: () => ({ className: styles.wrapCell }),
//       render: (v: string) => <div className={styles.wrapCellInner}>{v}</div>,
//     },
//     {
//       title: "Lavozim",
//       dataIndex: "lavozim",
//       key: "lavozim",
//       width: 100,
//       onCell: () => ({ className: styles.wrapCell }),
//       render: (v?: string) => <div className={styles.wrapCellInner}>{v ?? ""}</div>,
//     },
//     {
//       title: "Unvon",
//       dataIndex: "unvon",
//       key: "unvon",
//       width: 100,
//       onCell: () => ({ className: styles.wrapCell }),
//       render: (v?: string) => <div className={styles.wrapCellInner}>{v ?? ""}</div>,
//     },
//     {
//       title: "Umumiy ball",
//       dataIndex: "score",
//       key: "score",
//       width: 100,
//       onCell: () => ({ className: styles.wrapCell }),
//       render: (v: number) => <div className={styles.wrapCellInner}>{v}</div>,
//     },
//     {
//       title: "Test (1-3)",
//       dataIndex: "shots",
//       key: "shots_test",
//       width: 200,
//       onCell: () => ({ className: styles.wrapCell }),
//       render: (shots: number[]) => {
//         const lines = chunkArray(splitShots(shots).test, 12);
//         return <div className={styles.wrapCellInner}>{lines.map((l, i) => <div key={i}>{l}</div>)}</div>;
//       },
//     },
//     {
//       title: "Last (4+)",
//       dataIndex: "shots",
//       key: "shots_last",
//       width: 260,
//       onCell: () => ({ className: styles.wrapCell }),
//       render: (shots: number[]) => {
//         const lines = chunkArray(splitShots(shots).last, 16);
//         return <div className={styles.wrapCellInner}>{lines.map((l, i) => <div key={i}>{l}</div>)}</div>;
//       },
//     },
//     {
//       title: "Taxrirlash",
//       key: "actions",
//       fixed: "right",
//       width: 140,
//       render: (_, record) => (
//         <>
//           <Popconfirm title="Are you sure ?" onConfirm={() => handleDelete(record.id)}>
//             <Button danger size="small" style={{ marginLeft: 8 }}>
//               Delete
//             </Button>
//           </Popconfirm>
//         </>
//       ),
//     },
//   ];

//   return (
//     <div className={styles.containerResults}>
//       <div className={styles.resultsHeader}>
//         {results.length > 0 && (
//           <button className={styles.yuklab_olish} onClick={handleDownloadAllPDF}>
//             <p>Yuklab olish</p>
//             <span>
//               <FaCloudDownloadAlt />
//             </span>
//           </button>
//         )}
//       </div>
//       <Table<ResultRow>
//         dataSource={results}
//         columns={columns}
//         rowKey="id"
//         scroll={{ x: 1200 }}
//       />
//     </div>
//   );
// }