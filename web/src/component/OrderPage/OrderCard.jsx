import BottomBar from './OrderCard/BottomBar';
import ColumnHeader from './OrderCard/ColumnHeader';
import OrderCardHeader from './OrderCard/OrderCardHeader';
import OrderItems from './OrderCard/OrderItems';
import OrderSummary from './OrderCard/OrderSummary';


function OrderCard({ order, isExpanded, onToggle }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
            {/* ===== Header (clickable to expand/collapse) ===== */}
            <OrderCardHeader onToggle={onToggle} order={order} isExpanded={isExpanded} />

            {/* ===== Expandable Detail Body ===== */}
            {isExpanded && (
                <div className="border-t border-gray-100 p-4 bg-gray-50/50">
                    {/* Column Headers */}
                    <ColumnHeader />

                    {/* Items */}
                    <OrderItems order={order} />

                    {/* Summary */}
                    <OrderSummary order={order} />

                    {/* Download Receipt */}
                    <BottomBar order={order} />
                </div>
            )}
        </div>
    );
}


export default OrderCard