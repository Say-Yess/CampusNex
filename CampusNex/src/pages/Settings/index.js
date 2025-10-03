// src/pages/Settings/index.js
import React from 'react';
import SettingsLayout from './components/SettingsLayout';
import AccountSettings from './components/AccountSettings';
import NotificationSettings from './components/NotificationSettings';
import PrivacySettings from './components/PrivacySettings';
import SecuritySettings from './components/SecuritySettings';
import { useSettingsData } from './hooks/useSettingsData';

const Settings = () => {
    const {
        // State
        loading,
        successMessage,
        errorMessage,
        activeTab,
        accountForm,
        notificationSettings,
        privacySettings,
        securitySettings,

        // Actions
        setActiveTab,
        handleAccountFormChange,
        handleAccountSubmit,
        handleNotificationChange,
        handleNotificationSubmit,
        handlePrivacyChange,
        handlePrivacySubmit,
        handleSecuritySubmit
    } = useSettingsData();

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'account':
                return (
                    <AccountSettings
                        accountForm={accountForm}
                        handleAccountFormChange={handleAccountFormChange}
                        handleAccountSubmit={handleAccountSubmit}
                        loading={loading}
                        successMessage={successMessage}
                        errorMessage={errorMessage}
                    />
                );
            case 'notifications':
                return (
                    <NotificationSettings
                        notificationSettings={notificationSettings}
                        handleNotificationChange={handleNotificationChange}
                        handleNotificationSubmit={handleNotificationSubmit}
                        loading={loading}
                        successMessage={successMessage}
                        errorMessage={errorMessage}
                    />
                );
            case 'privacy':
                return (
                    <PrivacySettings
                        privacySettings={privacySettings}
                        handlePrivacyChange={handlePrivacyChange}
                        handlePrivacySubmit={handlePrivacySubmit}
                        loading={loading}
                        successMessage={successMessage}
                        errorMessage={errorMessage}
                    />
                );
            case 'security':
                return (
                    <SecuritySettings
                        securitySettings={securitySettings}
                        handleSecuritySubmit={handleSecuritySubmit}
                        loading={loading}
                        successMessage={successMessage}
                        errorMessage={errorMessage}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <SettingsLayout activeTab={activeTab} setActiveTab={setActiveTab}>
            {renderActiveTab()}
        </SettingsLayout>
    );
};

export default Settings;