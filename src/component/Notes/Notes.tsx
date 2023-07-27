import React from 'react';
import { Button, Form, Input, Select, Space } from 'antd';



const Notes = () => {
    const { Option } = Select;
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    const handleChange = (value: string[]) => {
        console.log(`selected ${value}`);
    };
    return (
        <div>
            <h1 className='font-bold text-[14px]'>Edit Note</h1>
            <Form
                name="complex-form"
                onFinish={onFinish}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ minWidth: 600 }}
            >


                <Form.Item label="Title" style={{ marginBottom: 0 }}>
                    <Form.Item
                        name="Title"
                        rules={[{ required: true }]}
                        style={{ display: 'inline-block', width: 'calc(50% - 20px)' }}
                    >
                        <Input placeholder="Input Title" />
                    </Form.Item>
                    <Form.Item
                        name="Tags"
                        rules={[{ required: true }]}
                        style={{ display: 'inline-block', width: 'calc(50% - 20px)', margin: '0 8px' }}
                    >
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="select one country"
                            defaultValue={['china']}
                            onChange={handleChange}
                            optionLabelProp="label"
                        >
                            <Option value="" label="">
                            </Option>
                            <Option value="china" label="China">
                                <Space>
                                    <span role="img" aria-label="China">
                                        🇨🇳
                                    </span>
                                    China (中国)
                                </Space>
                            </Option>
                            <Option value="usa" label="USA">
                                <Space>
                                    <span role="img" aria-label="USA">
                                        🇺🇸
                                    </span>
                                    USA (美国)
                                </Space>
                            </Option>
                            <Option value="japan" label="Japan">
                                <Space>
                                    <span role="img" aria-label="Japan">
                                        🇯🇵
                                    </span>
                                    Japan (日本)
                                </Space>
                            </Option>
                            <Option value="korea" label="Korea">
                                <Space>
                                    <span role="img" aria-label="Korea">
                                        🇰🇷
                                    </span>
                                    Korea (韩国)
                                </Space>
                            </Option>
                        </Select>
                    </Form.Item>
                </Form.Item>
                <Form.Item label=" " colon={false}>
                    <Button className="bg-red-500" type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
};

export default Notes;