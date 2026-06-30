import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Printer, Copy, Check } from "lucide-react";
import { Order } from "@/data/accountData";

interface Props { order: Order | null; onClose: () => void; }

function buildInvoiceHTML(order: Order): string {
  const itemRows = order.items.map(
    (item) => `
    <tr>
      <td style="padding:8px 4px;border-bottom:1px solid #f0ebe4;font-size:13px;color:#2D1A10;font-weight:500">${item.name}</td>
      <td style="padding:8px 4px;border-bottom:1px solid #f0ebe4;text-align:center;font-size:13px;color:#6b7280">${item.quantity}</td>
      <td style="padding:8px 4px;border-bottom:1px solid #f0ebe4;text-align:right;font-size:13px;color:#6b7280">₹${item.price}</td>
      <td style="padding:8px 4px;border-bottom:1px solid #f0ebe4;text-align:right;font-size:13px;color:#2D1A10;font-weight:600">₹${item.price * item.quantity}</td>
    </tr>`
  ).join("");

  const discountRow = order.discount > 0
    ? `<tr><td colspan="3" style="font-size:12px;color:#6b7280;padding:3px 0">Discount</td><td style="text-align:right;font-size:12px;color:#059669;font-weight:600;padding:3px 0">−₹${order.discount}</td></tr>`
    : "";

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Invoice ${order.invoiceNumber} — Palagaram</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fff;color:#2D1A10;-webkit-print-color-adjust:exact;print-color-adjust:exact}
    .page{max-width:520px;margin:0 auto;padding:32px 24px}
    @media print{body{margin:0}@page{margin:1cm}}
  </style>
</head>
<body>
<div class="page">
  <div style="background:linear-gradient(135deg,#2D1A10,#4B2E1A);border-radius:16px 16px 0 0;padding:28px 24px;text-align:center">
    <div style="width:52px;height:52px;background:#C89B5A;border-radius:12px;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:22px;font-weight:900;color:#fff">P</div>
    <div style="font-size:20px;font-weight:900;color:#fff;letter-spacing:2px">PALAGARAM</div>
    <div style="font-size:11px;color:rgba(255,255,255,0.5);margin-top:4px">Authentic South Indian Cuisine</div>
    <div style="font-size:10px;color:rgba(255,255,255,0.35);margin-top:2px">Chidambaram, Tamil Nadu • +91 44 2234 5678</div>
  </div>
  <div style="border:2px solid #EADBC8;border-top:none;border-radius:0 0 16px 16px;padding:24px">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
      <div><div style="font-size:10px;color:#9ca3af;font-weight:600;text-transform:uppercase;letter-spacing:1px">Invoice No</div><div style="font-size:13px;font-weight:700;margin-top:3px">${order.invoiceNumber}</div></div>
      <div style="text-align:right"><div style="font-size:10px;color:#9ca3af;font-weight:600;text-transform:uppercase;letter-spacing:1px">Date</div><div style="font-size:13px;font-weight:700;margin-top:3px">${order.date}</div></div>
      <div><div style="font-size:10px;color:#9ca3af;font-weight:600;text-transform:uppercase;letter-spacing:1px">Order ID</div><div style="font-size:13px;font-weight:700;margin-top:3px">${order.id}</div></div>
      <div style="text-align:right"><div style="font-size:10px;color:#9ca3af;font-weight:600;text-transform:uppercase;letter-spacing:1px">Transaction</div><div style="font-size:10px;font-weight:700;margin-top:3px">${order.transactionId}</div></div>
    </div>
    <div style="background:#FAF8F5;border-radius:10px;padding:12px 14px;margin-bottom:16px">
      <div style="font-size:10px;color:#9ca3af;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">Bill To</div>
      <div style="font-size:13px;font-weight:700">${order.address.name}</div>
      <div style="font-size:11px;color:#6b7280;margin-top:2px">${order.address.line1}${order.address.line2 ? `, ${order.address.line2}` : ""}</div>
      <div style="font-size:11px;color:#6b7280">${order.address.city}, ${order.address.state} — ${order.address.pincode}</div>
      <div style="font-size:11px;color:#6b7280;margin-top:2px">${order.address.phone}</div>
    </div>
    <table style="width:100%;border-collapse:collapse">
      <thead>
        <tr style="border-bottom:2px solid #e5e7eb">
          <th style="text-align:left;font-size:10px;color:#9ca3af;font-weight:600;text-transform:uppercase;letter-spacing:1px;padding:0 4px 8px">Item</th>
          <th style="text-align:center;font-size:10px;color:#9ca3af;font-weight:600;text-transform:uppercase;letter-spacing:1px;padding:0 4px 8px">Qty</th>
          <th style="text-align:right;font-size:10px;color:#9ca3af;font-weight:600;text-transform:uppercase;letter-spacing:1px;padding:0 4px 8px">Rate</th>
          <th style="text-align:right;font-size:10px;color:#9ca3af;font-weight:600;text-transform:uppercase;letter-spacing:1px;padding:0 4px 8px">Amt</th>
        </tr>
      </thead>
      <tbody>${itemRows}</tbody>
    </table>
    <div style="margin-top:12px;padding-top:8px">
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="font-size:12px;color:#6b7280;padding:3px 0">Subtotal</td><td style="text-align:right;font-size:12px;color:#2D1A10;padding:3px 0">₹${order.subtotal}</td></tr>
        <tr><td style="font-size:12px;color:#6b7280;padding:3px 0">GST (6%)</td><td style="text-align:right;font-size:12px;color:#2D1A10;padding:3px 0">₹${order.gst}</td></tr>
        <tr><td style="font-size:12px;color:#6b7280;padding:3px 0">Delivery</td><td style="text-align:right;font-size:12px;color:#2D1A10;padding:3px 0">${order.deliveryCharge === 0 ? "FREE" : `₹${order.deliveryCharge}`}</td></tr>
        ${discountRow}
      </table>
      <div style="border-top:2px dashed #EADBC8;margin-top:10px;padding-top:10px;display:flex;justify-content:space-between;align-items:center">
        <span style="font-size:14px;font-weight:900;color:#2D1A10">TOTAL PAID</span>
        <span style="font-size:20px;font-weight:900;color:#C89B5A">₹${order.total}</span>
      </div>
      <div style="text-align:center;font-size:10px;color:#9ca3af;margin-top:6px">Payment via ${order.paymentMethod}</div>
    </div>
    <div style="text-align:center;margin-top:16px;padding-top:14px;border-top:1px solid #f3f4f6">
      <div style="font-size:12px;color:#C89B5A;font-weight:600">Thank you for dining with Palagaram!</div>
      <div style="font-size:10px;color:#9ca3af;margin-top:3px">This is a system-generated invoice.</div>
    </div>
  </div>
</div>
<script>window.onload=function(){window.print();}</script>
</body>
</html>`;
}

export function InvoiceModal({ order, onClose }: Props) {
  const [copied, setCopied] = useState(false);

  if (!order) return null;

  const handlePrint = () => window.print();

  const handleDownloadPDF = () => {
    const html = buildInvoiceHTML(order);
    const win = window.open("", "_blank", "width=600,height=800");
    if (!win) return;
    win.document.open();
    win.document.write(html);
    win.document.close();
  };

  const handleCopy = async () => {
    const text = [
      `PALAGARAM — INVOICE`,
      `─────────────────────────`,
      `Invoice No : ${order.invoiceNumber}`,
      `Order ID   : ${order.id}`,
      `Date       : ${order.date}`,
      `Transaction: ${order.transactionId}`,
      ``,
      `BILL TO`,
      `${order.address.name}`,
      `${order.address.line1}${order.address.line2 ? `, ${order.address.line2}` : ""}`,
      `${order.address.city}, ${order.address.state} — ${order.address.pincode}`,
      ``,
      `ITEMS`,
      ...order.items.map((i) => `• ${i.name} × ${i.quantity}  ₹${i.price * i.quantity}`),
      ``,
      `Subtotal       : ₹${order.subtotal}`,
      `GST (6%)       : ₹${order.gst}`,
      `Delivery       : ${order.deliveryCharge === 0 ? "FREE" : `₹${order.deliveryCharge}`}`,
      ...(order.discount > 0 ? [`Discount       : −₹${order.discount}`] : []),
      `─────────────────────────`,
      `TOTAL PAID     : ₹${order.total}`,
      `Payment via ${order.paymentMethod}`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <AnimatePresence>
      {order && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[400] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col"
          >
            <div className="flex-shrink-0 px-6 py-4 flex items-center justify-between border-b border-gray-100">
              <h2 className="font-bold text-[#2D1A10] text-lg">Invoice</h2>
              <button onClick={onClose} className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 p-6">
              <div className="border-2 border-[#EADBC8] rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-br from-[#2D1A10] to-[#4B2E1A] px-6 py-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-[#C89B5A] flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <span className="text-white font-black text-xl">P</span>
                  </div>
                  <h3 className="text-white font-black text-xl tracking-tight">PALAGARAM</h3>
                  <p className="text-white/50 text-xs mt-1">Authentic South Indian Cuisine</p>
                  <p className="text-white/40 text-xs">Chidambaram, Tamil Nadu • +91 44 2234 5678</p>
                </div>

                <div className="px-6 py-5 space-y-4">
                  {/* Invoice Meta */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Invoice Number</p>
                      <p className="text-sm font-bold text-[#2D1A10] mt-0.5">{order.invoiceNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Date</p>
                      <p className="text-sm font-bold text-[#2D1A10] mt-0.5">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Order ID</p>
                      <p className="text-sm font-bold text-[#2D1A10] mt-0.5">{order.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Transaction</p>
                      <p className="text-[10px] font-bold text-[#2D1A10] mt-0.5">{order.transactionId}</p>
                    </div>
                  </div>

                  {/* Customer */}
                  <div className="bg-[#FAF8F5] rounded-xl px-4 py-3">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">Bill To</p>
                    <p className="text-sm font-bold text-[#2D1A10]">{order.address.name}</p>
                    <p className="text-xs text-gray-500">{order.address.line1}{order.address.line2 ? `, ${order.address.line2}` : ""}</p>
                    <p className="text-xs text-gray-500">{order.address.city}, {order.address.state} — {order.address.pincode}</p>
                    <p className="text-xs text-gray-500 mt-1">{order.address.phone}</p>
                  </div>

                  {/* Items Table */}
                  <div>
                    <div className="grid grid-cols-12 gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-200 pb-2 mb-2">
                      <span className="col-span-6">Item</span>
                      <span className="col-span-2 text-center">Qty</span>
                      <span className="col-span-2 text-right">Rate</span>
                      <span className="col-span-2 text-right">Amt</span>
                    </div>
                    {order.items.map((item) => (
                      <div key={item.id} className="grid grid-cols-12 gap-2 text-xs py-2 border-b border-gray-100">
                        <span className="col-span-6 text-[#2D1A10] font-medium">{item.name}</span>
                        <span className="col-span-2 text-center text-gray-500">{item.quantity}</span>
                        <span className="col-span-2 text-right text-gray-500">₹{item.price}</span>
                        <span className="col-span-2 text-right font-semibold text-[#2D1A10]">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="space-y-1.5 pt-1">
                    {[
                      { label: "Subtotal", value: `₹${order.subtotal}` },
                      { label: "GST (6%)", value: `₹${order.gst}` },
                      { label: "Delivery Charge", value: order.deliveryCharge === 0 ? "FREE" : `₹${order.deliveryCharge}` },
                      ...(order.discount > 0 ? [{ label: "Discount", value: `-₹${order.discount}`, green: true }] : []),
                    ].map((r, i) => (
                      <div key={i} className="flex justify-between text-xs">
                        <span className="text-gray-500">{r.label}</span>
                        <span className={(r as any).green ? "text-emerald-600 font-semibold" : "text-[#2D1A10]"}>{r.value}</span>
                      </div>
                    ))}
                    <div className="border-t-2 border-dashed border-[#EADBC8] pt-2 mt-2 flex justify-between">
                      <span className="font-black text-[#2D1A10] text-sm">TOTAL PAID</span>
                      <span className="font-black text-[#C89B5A] text-lg">₹{order.total}</span>
                    </div>
                    <p className="text-[10px] text-center text-gray-400 mt-2">Payment via {order.paymentMethod}</p>
                  </div>

                  {/* Footer */}
                  <div className="text-center pt-3 border-t border-gray-100">
                    <p className="text-xs text-[#C89B5A] font-semibold">Thank you for dining with Palagaram!</p>
                    <p className="text-[10px] text-gray-400 mt-1">This is a system-generated invoice.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions — 3 buttons */}
            <div className="flex-shrink-0 px-6 pb-5 pt-3 border-t border-gray-100 flex gap-2.5">
              <button
                onClick={handlePrint}
                className="flex items-center justify-center gap-1.5 py-3 px-4 rounded-2xl border-2 border-[#2D1A10] text-[#2D1A10] font-semibold text-sm hover:bg-[#2D1A10] hover:text-white transition-all"
              >
                <Printer className="w-4 h-4" /> Print
              </button>

              <motion.button
                onClick={handleCopy}
                animate={copied ? { scale: [1, 1.05, 1] } : {}}
                className={`flex flex-1 items-center justify-center gap-1.5 py-3 rounded-2xl border-2 font-semibold text-sm transition-all ${
                  copied
                    ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                    : "border-[#C89B5A]/50 text-[#C89B5A] hover:border-[#C89B5A] hover:bg-[#FDF8F2]"
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy Invoice"}
              </motion.button>

              <button
                onClick={handleDownloadPDF}
                className="flex flex-1 items-center justify-center gap-1.5 py-3 rounded-2xl bg-[#C89B5A] text-white font-semibold text-sm hover:bg-[#B88A4A] transition-all"
              >
                <Download className="w-4 h-4" /> Download PDF
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
