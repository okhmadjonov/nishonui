import React, { useMemo, useState } from "react";
import "antd/dist/reset.css";
import {
    Table,
    Input,
    Button,
    Space,
    Popconfirm,
    Avatar,
    TableColumnsType,
} from "antd";
import {
    SearchOutlined,
    EditOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import styles from "./Results.module.scss";

type UserResult = {
    id: number;
    image: string;
    fullName: string;
    pnfl: string;
    baho: string;
    natijalar: string;
};

import UserPng from "../../assets/img/user.png"

const initialData: UserResult[] = [
    {
        id: 1,
        image: UserPng,
        fullName: "Sardor Axmedov Abdurasulovich",
        pnfl: "12345678901234",
        baho: "Alo",
        natijalar: "8,7,9,7",
    },
    {
        id: 2,
        image: UserPng,
        fullName: "Maqsudbek Baratov Iskandarovich",
        pnfl: "98765432109876",
        baho: "Qoniqarli",
        natijalar: "6,7,6",
    },
];

const Results: React.FC = () => {
    const [data, setData] = useState<UserResult[]>(initialData);
    const [search, setSearch] = useState<string>("");
    const [pageSize, setPageSize] = useState<number>(5);

    const handleDelete = (id: number) => {
        setData((prev) => prev.filter((r) => r.id !== id));
    };

    const handleEdit = (id: number) => {
        const row = data.find((d) => d.id === id);
        if (!row) return;
        const name = prompt("Edit full name", row.fullName);
        if (name !== null && name.trim() !== "") {
            setData((prev) =>
                prev.map((r) => (r.id === id ? { ...r, fullName: name } : r))
            );
        }
    };



    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return data;
        return data.filter(
            (r) =>
                String(r.id).includes(q) ||
                r.fullName.toLowerCase().includes(q) ||
                r.pnfl.toLowerCase().includes(q) ||
                String(r.baho).includes(q) ||
                r.natijalar.toLowerCase().includes(q)
        );
    }, [data, search]);


    const columns: TableColumnsType<UserResult> = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 80,
            sorter: (a, b) => a.id - b.id,
            defaultSortOrder: "ascend",
        },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            width: 90,
            render: (src: string, record: UserResult) => (
                <Avatar
                    shape="square"
                    size={56}
                    src={src}
                    alt={record.fullName}
                    className={styles.avatar}
                />
            ),
        },
        {
            title: "Full name",
            dataIndex: "fullName",
            key: "fullName",
            sorter: (a, b) => a.fullName.localeCompare(b.fullName),
            render: (text: string) => <div className={styles.fullName}>{text}</div>,
        },
        {
            title: "PNFL",
            dataIndex: "pnfl",
            key: "pnfl",
            width: 180,
            render: (text: string) => <div className={styles.pnfl}>{text}</div>,
        },
        {
            title: "Baho",
            dataIndex: "baho",
            key: "baho",
            width: 110,
            onFilter: (value, record) => record.baho === value,
            render: (val: number) => <div className={styles.baho}>{val}</div>,
        },
        {
            title: "Natijalar",
            dataIndex: "natijalar",
            key: "natijalar",
            render: (text: string) => <div className={styles.natijalar}>{text}</div>,
        },
        {
            title: "Actions",
            key: "actions",
            width: 140,
            render: (_, record: UserResult) => (
                <Space size="small">
                    <Button onClick={() => handleEdit(record.id)} icon={<EditOutlined />} />
                    <Popconfirm
                        title="Are you sure to delete?"
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className={styles.results}>
            <div className={styles.header}>
                    <Input
                        prefix={<SearchOutlined />}
                        placeholder="Search by id, name, pnfl, baho or result"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        allowClear
                        className={styles.search}
                    />

            </div>
            <div className={styles.tableWrap}>
                <Table<UserResult>
                    columns={columns}
                    dataSource={filtered}
                    rowKey="id"
                    pagination={{
                        pageSize,
                        showSizeChanger: true,
                        pageSizeOptions: ["5", "10", "20", "50"],
                        onShowSizeChange: (_, size) => setPageSize(size),
                    }}
                    bordered
                />
            </div>
        </div>
    );
};

export default Results;
