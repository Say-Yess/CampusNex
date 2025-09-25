// src/pages/UIDemo.js
import React, { useState } from 'react';
import {
    Alert,
    Badge,
    Button,
    Card,
    Form,
    Input,
    Modal,
    Toggle
} from '../components/ui';

const UIDemo = () => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        bio: '',
        notifications: true
    });
    const [submittedData, setSubmittedData] = useState(null);
    const [showAlert, setShowAlert] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleToggle = () => {
        setFormData(prev => ({
            ...prev,
            notifications: !prev.notifications
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmittedData(formData);
        setShowModal(true);
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold text-neutral-900 mb-8">UI Component Demo</h1>

            {/* Alert Demo */}
            {showAlert && (
                <div className="mb-8">
                    <Alert
                        variant="info"
                        title="Welcome to the UI Demo"
                        dismissible={true}
                        onDismiss={() => setShowAlert(false)}
                    >
                        This page demonstrates the new UI components from our design system.
                    </Alert>
                </div>
            )}

            {/* Badge Demo */}
            <Card className="mb-8">
                <h2 className="text-xl font-bold mb-4">Badges</h2>
                <div className="flex flex-wrap gap-2">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="danger">Danger</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="info">Info</Badge>
                </div>
            </Card>

            {/* Button Demo */}
            <Card className="mb-8">
                <h2 className="text-xl font-bold mb-4">Buttons</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="tertiary">Tertiary</Button>
                    <Button variant="danger">Danger</Button>
                    <Button variant="primary" loading={true}>Loading</Button>
                    <Button variant="primary" disabled={true}>Disabled</Button>
                    <Button variant="primary" size="sm">Small</Button>
                    <Button variant="primary" size="lg">Large</Button>
                </div>
            </Card>

            {/* Form Demo */}
            <Card className="mb-8">
                <h2 className="text-xl font-bold mb-4">Form Components</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Section title="User Information" description="Please provide your details below">
                        <Form.Group cols={2}>
                            <Input
                                label="Name"
                                name="name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                label="Email"
                                name="email"
                                type="email"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Input
                            label="Bio"
                            name="bio"
                            placeholder="Tell us about yourself"
                            value={formData.bio}
                            onChange={handleChange}
                            helper="A brief description of yourself"
                        />
                        <div className="mt-4">
                            <Toggle
                                label="Receive notifications"
                                checked={formData.notifications}
                                onChange={handleToggle}
                            />
                        </div>
                    </Form.Section>

                    <div className="mt-6">
                        <Button type="submit" variant="primary">
                            Submit Form
                        </Button>
                    </div>
                </Form>
            </Card>

            {/* Card Variants Demo */}
            <h2 className="text-xl font-bold mb-4">Card Variants</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <Card variant="default">
                    <h3 className="font-medium mb-2">Default Card</h3>
                    <p className="text-neutral-600">This is the default card style.</p>
                </Card>
                <Card variant="elevated">
                    <h3 className="font-medium mb-2">Elevated Card</h3>
                    <p className="text-neutral-600">This card has more elevation.</p>
                </Card>
                <Card variant="flat">
                    <h3 className="font-medium mb-2">Flat Card</h3>
                    <p className="text-neutral-600">This is a flat card with border.</p>
                </Card>
                <Card variant="outlined">
                    <h3 className="font-medium mb-2">Outlined Card</h3>
                    <p className="text-neutral-600">This card has only an outline.</p>
                </Card>
            </div>

            {/* Modal Demo */}
            <div className="mb-8">
                <Button onClick={() => setShowModal(true)}>Open Modal</Button>

                <Modal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    title="Modal Demo"
                >
                    <div className="mb-4">
                        <p className="text-neutral-700 mb-4">
                            This is a modal dialog from our UI component library.
                        </p>

                        {submittedData && (
                            <Card variant="flat" className="mb-4">
                                <h3 className="font-medium mb-2">Form Submission</h3>
                                <pre className="bg-neutral-50 p-4 rounded text-sm">
                                    {JSON.stringify(submittedData, null, 2)}
                                </pre>
                            </Card>
                        )}
                    </div>

                    <div className="flex justify-end space-x-2">
                        <Button variant="tertiary" onClick={() => setShowModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default UIDemo;