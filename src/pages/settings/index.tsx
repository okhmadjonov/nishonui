import { useState } from "react";
import {
    Form,
    Input,
    Button,
    Select,
    Table,
    Space,
    Popconfirm,
    Spin,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import styles from "./Settings.module.scss";
import { API } from "@/services/api";
import { Region, RegionBranch, Rubej } from "@/interfaces";

const { Option } = Select;



const Settings = () => {
    const [formBranch] = Form.useForm();
    const [formRubej] = Form.useForm();

    const [branches, setBranches] = useState<RegionBranch[]>([]);
    const [rubejs, setRubejs] = useState<Rubej[]>([]);

    const { data: regionsData, isLoading } = useQuery<{
        list: Region[];
    }>({
        queryKey: ["regions"],
        queryFn: API.getAllRegions,
    });

    const regions = regionsData?.list || [];

    const handleAddBranch = (values: Omit<RegionBranch, "id">) => {
        const newBranch: RegionBranch = { id: Date.now(), ...values };
        setBranches((prev) => [...prev, newBranch]);
        formBranch.resetFields();
    };

    const handleAddRubej = (values: Omit<Rubej, "id">) => {
        const newRubej: Rubej = { id: Date.now(), ...values };
        setRubejs((prev) => [...prev, newRubej]);
        formRubej.resetFields();
    };

    const handleDeleteBranch = (id: number) => {
        setBranches(branches.filter((b) => b.id !== id));
        setRubejs(rubejs.filter((r) => r.branch !== branches.find(b => b.id === id)?.branch));
    };

    const handleDeleteRubej = (id: number) => {
        setRubejs(rubejs.filter((r) => r.id !== id));
    };

    const branchColumns: ColumnsType<RegionBranch> = [
        {
            title: "Region",
            dataIndex: "region",
            key: "region",
            render: (code: string) => regions.find(r => r.code === code)?.name || code,
        },
        {
            title: "Branch",
            dataIndex: "branch",
            key: "branch",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Popconfirm
                    title="Delete this branch?"
                    onConfirm={() => handleDeleteBranch(record.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button danger size="small" icon={<DeleteOutlined />} />
                </Popconfirm>
            ),
        },
    ];

    const rubejColumns: ColumnsType<Rubej> = [
        {
            title: "Region",
            dataIndex: "region",
            key: "region",
            render: (code: string) => regions.find(r => r.code === code)?.name || code,
        },
        {
            title: "Branch",
            dataIndex: "branch",
            key: "branch",
        },
        {
            title: "Rubej",
            dataIndex: "rubej",
            key: "rubej",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Popconfirm
                    title="Delete this rubej?"
                    onConfirm={() => handleDeleteRubej(record.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button danger size="small" icon={<DeleteOutlined />} />
                </Popconfirm>
            ),
        },
    ];

    if (isLoading) {
        return <Spin size="large" style={{ display: "block", margin: "50px auto" }} />;
    }

    return (
        <div className={styles.settings}>
            <h3 className={styles.title}>➊ Add Branch (Region + Branch)</h3>
            <Form
                form={formBranch}
                layout="inline"
                onFinish={handleAddBranch}
                style={{ marginBottom: 20 }}
            >
                <Form.Item
                    name="region"
                    rules={[{ required: true, message: "Select region" }]}
                >
                    <Select placeholder="Region" style={{ width: 160 }}>
                        {regions.map((r) => (
                            <Option key={r.id} value={r.code}>
                                {r.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="branch"
                    rules={[{ required: true, message: "Enter branch" }]}
                >
                    <Input placeholder="Branch" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Branch
                    </Button>
                </Form.Item>
            </Form>

            <Table
                dataSource={branches}
                columns={branchColumns}
                rowKey="id"
                pagination={false}
                style={{ marginBottom: 40 }}
            />

            <h3 className={styles.title}>➋ Add Rubej (Region + Branch + Rubej)</h3>
            <Form
                form={formRubej}
                layout="inline"
                onFinish={handleAddRubej}
                style={{ marginBottom: 20 }}
            >
                <Form.Item
                    name="region"
                    rules={[{ required: true, message: "Select region" }]}
                >
                    <Select placeholder="Region" style={{ width: 160 }}>
                        {regions.map((r) => (
                            <Option key={r.id} value={r.code}>
                                {r.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="branch"
                    rules={[{ required: true, message: "Select branch" }]}
                >
                    <Select placeholder="Branch" style={{ width: 160 }}>
                        {branches.map((b) => (
                            <Option key={b.id} value={b.branch}>
                                {b.branch}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="rubej"
                    rules={[{ required: true, message: "Enter rubej" }]}
                >
                    <Input placeholder="Rubej" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Rubej
                    </Button>
                </Form.Item>
            </Form>

            <Table
                dataSource={rubejs}
                columns={rubejColumns}
                rowKey="id"
                pagination={{ pageSize: 5 }}
            />
        </div>
    );
};

export default Settings;
