// src/pages/ComponentsDemo.js
import React, { useState } from 'react';
import {
    Alert,
    AnimatedCard,
    Badge,
    Button,
    Card,
    Carousel,
    Footer,
    Form,
    Input,
    Leaderboard,
    Modal,
    Navbar,
    Toggle
} from '../components/ui';

const ComponentsDemo = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alertVisible, setAlertVisible] = useState(true);
    const [toggleValue, setToggleValue] = useState(false);

    // Sample data for carousel
    const carouselItems = [
        { id: 1, title: 'Slide 1', content: 'This is slide 1 content' },
        { id: 2, title: 'Slide 2', content: 'This is slide 2 content' },
        { id: 3, title: 'Slide 3', content: 'This is slide 3 content' },
    ];

    // Sample data for leaderboard
    const leaderboardItems = [
        { id: 1, name: 'John Smith', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', department: 'Computer Science', points: 89, rank: 1 },
        { id: 2, name: 'Alice Johnson', avatar: 'https://randomuser.me/api/portraits/women/1.jpg', department: 'Business Admin', points: 76, rank: 2 },
        { id: 3, name: 'Robert Lee', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', department: 'Electrical Engineering', points: 72, rank: 3 },
    ];

    return (
        <div className="min-h-screen bg-neutral-50">
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-neutral-900 mb-8">CampusNex UI Components</h1>

                {/* Alerts Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-800 mb-4">Alerts</h2>
                    <div className="space-y-4">
                        {alertVisible && (
                            <Alert
                                variant="success"
                                title="Success Alert"
                                message="This operation was completed successfully."
                                onClose={() => setAlertVisible(false)}
                            />
                        )}
                        <Alert variant="error" title="Error Alert" message="Something went wrong. Please try again." />
                        <Alert variant="warning" title="Warning Alert" message="This action cannot be undone." />
                        <Alert variant="info" title="Info Alert" message="The system will be under maintenance tonight." />
                    </div>
                </section>

                {/* Badges Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-800 mb-4">Badges</h2>
                    <div className="flex flex-wrap gap-4">
                        <Badge variant="primary">Primary</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="success">Success</Badge>
                        <Badge variant="error">Error</Badge>
                        <Badge variant="warning">Warning</Badge>
                        <Badge variant="info">Info</Badge>
                    </div>
                </section>

                {/* Buttons Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-800 mb-4">Buttons</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold">Primary</h3>
                            <div className="flex flex-wrap gap-2">
                                <Button variant="primary" size="sm">Small</Button>
                                <Button variant="primary" size="md">Medium</Button>
                                <Button variant="primary" size="lg">Large</Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold">Secondary</h3>
                            <div className="flex flex-wrap gap-2">
                                <Button variant="secondary" size="sm">Small</Button>
                                <Button variant="secondary" size="md">Medium</Button>
                                <Button variant="secondary" size="lg">Large</Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold">Tertiary</h3>
                            <div className="flex flex-wrap gap-2">
                                <Button variant="tertiary" size="sm">Small</Button>
                                <Button variant="tertiary" size="md">Medium</Button>
                                <Button variant="tertiary" size="lg">Large</Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold">States</h3>
                            <div className="flex flex-wrap gap-2">
                                <Button variant="primary" loading>Loading</Button>
                                <Button variant="primary" disabled>Disabled</Button>
                                <Button variant="danger">Danger</Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Cards Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-800 mb-4">Cards</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card variant="flat" padding="default">
                            <h3 className="text-xl font-bold mb-2">Flat Card</h3>
                            <p>This is a flat card with default padding.</p>
                        </Card>

                        <Card variant="elevated" padding="large">
                            <h3 className="text-xl font-bold mb-2">Elevated Card</h3>
                            <p>This is an elevated card with large padding.</p>
                        </Card>

                        <Card variant="outlined" padding="small">
                            <h3 className="text-xl font-bold mb-2">Outlined Card</h3>
                            <p>This is an outlined card with small padding.</p>
                        </Card>

                        <AnimatedCard variant="elevated" animationType="fade" className="col-span-1 md:col-span-3">
                            <h3 className="text-xl font-bold mb-2">Animated Card</h3>
                            <p>This card animates when it enters the viewport.</p>
                        </AnimatedCard>
                    </div>
                </section>

                {/* Carousel Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-800 mb-4">Carousel</h2>
                    <Carousel
                        items={carouselItems}
                        renderItem={(item) => (
                            <Card key={item.id} variant="elevated" padding="default" className="h-40">
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p>{item.content}</p>
                            </Card>
                        )}
                        autoPlay={true}
                        interval={5000}
                    />
                </section>

                {/* Forms Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-800 mb-4">Form Elements</h2>
                    <Form onSubmit={(e) => e.preventDefault()} className="max-w-lg">
                        <Form.Group label="Email Address" htmlFor="email">
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                            />
                        </Form.Group>

                        <Form.Group label="Password" htmlFor="password">
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                            />
                        </Form.Group>

                        <Form.Group className="flex items-center">
                            <Toggle
                                checked={toggleValue}
                                onChange={() => setToggleValue(!toggleValue)}
                                id="remember"
                            />
                            <label htmlFor="remember" className="ml-2 text-neutral-700">Remember me</label>
                        </Form.Group>

                        <Button type="submit" variant="primary" fullWidth className="mt-4">Submit</Button>
                    </Form>
                </section>

                {/* Leaderboard Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-800 mb-4">Leaderboard</h2>
                    <Leaderboard items={leaderboardItems} title="Top Students" />
                </section>

                {/* Modal Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-neutral-800 mb-4">Modal</h2>
                    <Button variant="primary" onClick={() => setIsModalOpen(true)}>Open Modal</Button>

                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        title="Example Modal"
                    >
                        <p className="mb-4">This is an example modal dialog.</p>
                        <div className="flex justify-end space-x-2">
                            <Button variant="tertiary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                            <Button variant="primary" onClick={() => setIsModalOpen(false)}>Confirm</Button>
                        </div>
                    </Modal>
                </section>
            </div>

            <Footer />
        </div>
    );
};

export default ComponentsDemo;