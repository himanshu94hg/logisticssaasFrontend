import React from 'react';
import { FaMoneyBillWave, FaUniversity, FaChartPie, FaMoneyBillWaveAlt, FaCreditCard, FaDollarSign } from 'react-icons/fa';
import CashRuppeeIcon from '../../../../common/Icons/CashRuppeeIcon';
import TotalRevenueIconRuppee from '../../../../common/Icons/TotalRevenueIconRuppee';
import PrepaidRevenueIcon from './PrepaidRevenueIcon';


const RevenueOverview = ({ data }) => {
    const cod = data?.cod_revenue || 0;
    const prepaid = data?.prepaid_revenue || 0;
    // const totalDeliveredOrders = data?.total_delivered_orders || 0;
    const totalRevenue = cod + prepaid;
    const formatCurrency = (num) =>
        '₹' + num.toLocaleString();

    return (
        <div style={styles.container}>
            <Card
                icon={<CashRuppeeIcon />}
                label="COD Revenue"
                value={formatCurrency(cod)}
                bgColor="#d7eddf"
            />
            <Card
                icon={<PrepaidRevenueIcon />}
                label="Prepaid Revenue"
                value={formatCurrency(prepaid)}
                bgColor="#e1e9f0"
            />
            <Card
                icon={<TotalRevenueIconRuppee />}
                label="Total Revenue"
                value={formatCurrency(totalRevenue)}
                bgColor="#e3eef8"
            />
        </div>
    );
};

const Card = ({ icon, label, value, bgColor }) => (
    <div style={{ ...styles.card, backgroundColor: bgColor }}>
        <div style={styles.icon}>{icon}</div>
        <div style={styles.label}>{label}</div>
        <div style={styles.value}>{value}</div>
    </div>
);

const styles = {
    container: {
        display: 'flex',
        gap: 16,
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 20,
    },
    card: {
        flex: '1 1 200px',
        minWidth: 180,
        padding: 20,
        borderRadius: 12,
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        textAlign: 'center',
    },
    icon: {
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    value: {
        fontSize: 24,
        fontWeight: '700',
        color: '#111',
    },
};

export default RevenueOverview;
