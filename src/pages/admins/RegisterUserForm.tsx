import { useState } from "react";
import {
    Form,
    Input,
    Button,
    Select,
    Upload,
    Space,
    message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/services/api";
import styles from "./Admins.module.scss";

const { Option } = Select;

const RegisterUserForm = ({ onSuccess }: { onSuccess?: () => void }) => {
    const [form] = Form.useForm();
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const [photoFile, setPhotoFile] = useState<File | null>(null);

    const { data: regionsData } = useQuery({
        queryKey: ["regions"],
        queryFn: API.getAllRegions,
    });

    const { data: rolesData } = useQuery({
        queryKey: ["roles"],
        queryFn: API.getAllRoles,
    });

    const regions = regionsData?.list ?? [];
    const roles = rolesData?.list ?? [];

    const handleSubmit = async (values: any) => {
        try {
            const formData = new FormData();
            formData.append("UserName", values.userName);
            formData.append("UniqueId", values.uniqueId);
            formData.append("Password", values.password);
            if (values.phoneNumber) formData.append("PhoneNumber", values.phoneNumber);
            formData.append("RegionId", values.regionId);
            formData.append("BranchId", values.branchId);
            formData.append("RoleId", values.roleId);
            if (photoFile) formData.append("Photo", photoFile);

            await API.registerUser(formData);
            message.success("User created successfully");
            form.resetFields();
            setPhotoFile(null);
            onSuccess?.();
        } catch (error) {
            console.error(error);
            message.error("Failed to create user");
        }
    };

    return (
        <Form
            form={form}
            layout="inline"
            onFinish={handleSubmit}
            className={styles.registerForm}
        >
            <Form.Item
                name="userName"
                rules={[{ required: true, message: "Username is required" }]}
            >
                <Input placeholder="Username" />
            </Form.Item>

            <Form.Item
                name="uniqueId"
                rules={[{ required: true, message: "UniqueId is required" }]}
            >
                <Input placeholder="Unique ID" />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: "Password is required" }]}
            >
                <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item name="phoneNumber">
                <Input placeholder="Phone Number" />
            </Form.Item>

            <Form.Item
                name="regionId"
                rules={[{ required: true, message: "Select region" }]}
            >
                <Select
                    placeholder="Select Region"
                    style={{ width: 150 }}
                    onChange={(value) => {
                        setSelectedRegion(value);
                        form.setFieldsValue({ branchId: undefined });
                    }}
                >
                    {regions.map((r: any) => (
                        <Option key={r.id} value={r.id}>
                            {r.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                name="branchId"
                rules={[{ required: true, message: "Select branch" }]}
            >
                <Select
                    placeholder="Select Branch"
                    style={{ width: 150 }}
                    disabled={!selectedRegion}
                >
                    {regions
                        .find((r: any) => r.id === selectedRegion)
                        ?.branches.map((b: any) => (
                            <Option key={b.id} value={b.id}>
                                {b.name}
                            </Option>
                        ))}
                </Select>
            </Form.Item>

            <Form.Item
                name="roleId"
                rules={[{ required: true, message: "Select role" }]}
            >
                <Select placeholder="Select Role" style={{ width: 150 }}>
                    {roles.map((r: any) => (
                        <Option key={r.id} value={r.id}>
                            {r.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item>
                <Upload
                    beforeUpload={(file) => {
                        setPhotoFile(file);
                        return false;
                    }}
                    maxCount={1}
                    showUploadList={{ showRemoveIcon: true }}
                    onRemove={() => setPhotoFile(null)}
                >
                    <Button icon={<UploadOutlined />}>Upload Photo</Button>
                </Upload>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
};

export default RegisterUserForm;
