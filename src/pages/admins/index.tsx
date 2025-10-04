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
import {
    EditOutlined,
    DeleteOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/services/api";
import styles from "./Admins.module.scss";
import RegisterUserForm from "./RegisterUserForm";

type Admin = {
    id: string;
    userName: string;
    role: string;
    photoUrl?: string | null;
};

const { Option } = Select;

const Admins = () => {
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState("");

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: () => API.getUsers({ pi: 1, ps: 10 }),
    });

    const admins: Admin[] = data?.items ?? [];

    const handleDelete = (id: string) => {
        console.log("delete user id:", id);
    };

    const handleEdit = (id: string) => {
        const row = admins.find((a) => a.id === id);
        if (!row) return;
        const name = prompt("Edit username", row.userName);
        if (name && name.trim() !== "") {
            console.log("update user", id, name);
        }
    };

    const filteredAdmins = admins.filter(
        (a) =>
            a.userName.toLowerCase().includes(searchText.toLowerCase()) ||
            a.role.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns: ColumnsType<Admin> = [
        {
            title: "Photo",
            dataIndex: "photoUrl",
            key: "photoUrl",
            render: (url) =>
                url ? (
                    <img src={url} alt="avatar" style={{ width: 32, height: 32, borderRadius: "50%" }} />
                ) : (
                    "—"
                ),
        },
        {
            title: "Username",
            dataIndex: "userName",
            key: "userName",
            sorter: (a, b) => a.userName.localeCompare(b.userName),
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
            filters: [
                { text: "SuperAdmin", value: "SuperAdmin" },
                { text: "Admin", value: "Admin" },
                { text: "User", value: "User" },
            ],
            onFilter: (value, record) => record.role === value,
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space>
                    <Button
                        onClick={() => handleEdit(record.id)}
                        icon={<EditOutlined />}
                        size="small"
                    />
                    <Popconfirm
                        title="Are you sure delete this admin?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            danger
                            size="small"
                            icon={<DeleteOutlined />}
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className={styles.admins}>
            <h2 className={styles.title}>Admins Management</h2>

            <div className={styles.controladmins}>
                <RegisterUserForm onSuccess={refetch} />
            </div>

            <div className={styles.searchBar}>
                <Input
                    placeholder="Search..."
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>

            {isLoading ? (
                <Spin size="large" />
            ) : (
                <Table
                    className={styles.table}
                    dataSource={filteredAdmins}
                    columns={columns}
                    rowKey="id"
                    pagination={{ pageSize: 5 }}
                />
            )}
        </div>
    );
};

export default Admins;
