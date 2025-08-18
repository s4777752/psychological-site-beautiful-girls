import PaymentNotifications from "@/components/PaymentNotifications";

const ManagerPaymentsTab = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-warm-800">Уведомления о записях</h2>
      <PaymentNotifications userRole="manager" />
    </div>
  );
};

export default ManagerPaymentsTab;