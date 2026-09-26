"use client";
import { useState } from "react";

type Status = "Pending" | "In-Transit" | "Delivered" | "Returned";
type Challan = { id: string; party: string; amount: number; tax: number; status: Status; driver: string; vehicle: string; date: string; approved: boolean };

export default function ChallanPortal() {
  const [active, setActive] = useState("Challan Generation");
  const [challans, setChallans] = useState<Challan[]>([
    { id: "CH-101", party: "Gul Ahmed", amount: 150000, tax: 27000, status: "In-Transit", driver: "Irfan", vehicle: "KHI-1234", date: "2026-09-26", approved: false },
  ]);
  const [form, setForm] = useState({ party: "", amount: "", tax: "", driver: "", vehicle: "" });

  const createChallan = () => {
    if(!form.party) return alert("Party Name required");
    const newC: Challan = {
      id: `CH-${100+challans.length+1}`, party: form.party, amount: Number(form.amount)||0, tax: Number(form.tax)||0,
      status: "Pending", driver: form.driver, vehicle: form.vehicle, date: new Date().toISOString().slice(0,10), approved: false
    };
    setChallans([newC,...challans]); setForm({ party: "", amount: "", tax: "", driver: "", vehicle: ""}); setActive("Dispatch Tracking");
  };

  const menu = ["Challan Generation", "Dispatch Tracking", "AR Posting", "Tax Ledger", "Reconciliation", "Approval Workflow", "Reporting & Audit", "Admin Console"];

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex">
      {/* SIDEBAR */}
      <div className="w-64 bg-black text-white p-4 hidden md:block">
        <h1 className="font-black text-xl">TEXFLOW</h1><p className="text-[10px] text-gray-400 mb-6">Challan Management System v1.0</p>
        {menu.map(m => <button key={m} onClick={()=>setActive(m)} className={`w-full text-left p-2.5 text-xs mb-1 rounded ${active===m?'bg-white text-black font-bold':'text-gray-300 hover:bg-zinc-800'}`}>{m}</button>)}
        <div className="mt-10 text-[10px] text-gray-500">Roles: Dispatch | Finance | Admin | Management<br/>Convex Interactive Proposal</div>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-3 md:p-6">
        <div className="flex gap-2 overflow-x-auto mb-4 md:hidden">
          {menu.map(m => <button key={m} onClick={()=>setActive(m)} className={`whitespace-nowrap px-3 py-1.5 text-[10px] rounded-full border ${active===m?'bg-black text-white':'bg-white'}`}>{m}</button>)}
        </div>

        {active==="Challan Generation" && (
          <div className="bg-white border-2 border-black p-4 max-w-3xl">
            <h2 className="font-black text-lg">CHALLAN AUTO-GENERATION</h2><p className="text-xs text-gray-500 mb-4">Source: Sales Order / Gate Pass / Inventory Removal</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2"><label className="text-[10px] font-bold">PARTY / CUSTOMER NAME</label><input value={form.party} onChange={e=>setForm({...form, party:e.target.value})} className="w-full border border-black p-2 text-sm" placeholder="e.g Gul Ahmed" /></div>
              <div><label className="text-[10px] font-bold">DRIVER NAME</label><input value={form.driver} onChange={e=>setForm({...form, driver:e.target.value})} className="w-full border border-black p-2 text-sm" /></div>
              <div><label className="text-[10px] font-bold">VEHICLE NO</label><input value={form.vehicle} onChange={e=>setForm({...form, vehicle:e.target.value})} className="w-full border border-black p-2 text-sm" /></div>
              <div><label className="text-[10px] font-bold">SALES AMOUNT (PKR)</label><input type="number" value={form.amount} onChange={e=>setForm({...form, amount:e.target.value})} className="w-full border border-black p-2 text-sm" /></div>
              <div><label className="text-[10px] font-bold">SALES TAX (PKR)</label><input type="number" value={form.tax} onChange={e=>setForm({...form, tax:e.target.value})} className="w-full border border-black p-2 text-sm" /></div>
            </div>
            <button onClick={createChallan} className="w-full bg-black text-white py-3 mt-4 font-bold">GENERATE CHALLAN + AUTO AR POSTING</button>
            <p className="text-[10px] mt-2">On generate: System will auto-debit Customer AR and credit Sales Revenue as per proposal.</p>
          </div>
        )}

        {active==="Dispatch Tracking" && (
          <div className="bg-white border border-black p-4">
            <h2 className="font-bold">DISPATCH TRACKING - Real Time Status</h2>
            <table className="w-full mt-3 border-collapse text-xs">
              <thead className="bg-black text-white"><tr><th className="p-2">CHALLAN</th><th>PARTY</th><th>DRIVER/VEHICLE</th><th>STATUS</th><th>ACTION</th></tr></thead>
              <tbody>{challans.map(c=><tr key={c.id} className="border-b"><td className="p-2 font-bold">{c.id}</td><td>{c.party}</td><td>{c.driver} / {c.vehicle}</td><td><select value={c.status} onChange={e=>setChallans(challans.map(x=>x.id===c.id?{...x, status:e.target.value as Status}:x))} className="border p-1"><option>Pending</option><option>In-Transit</option><option>Delivered</option><option>Returned</option></select></td><td><button onClick={()=>window.print()} className="bg-gray-200 px-2 py-1">Print</button></td></tr>)}</tbody>
            </table>
          </div>
        )}

        {active==="AR Posting" && (
          <div className="bg-white border border-black p-4">
            <h2 className="font-bold">AUTOMATED AR POSTING</h2><p className="text-xs mt-1">Rule: Debit Customer Account (AR), Credit Sales Revenue</p>
            <div className="mt-4 grid grid-cols-3 gap-4 text-xs">
              {challans.map(c=><div key={c.id} className="border p-3"><div className="font-bold">{c.id} - {c.party}</div><div className="mt-2">DR Customer A/C - Rs. {c.amount + c.tax}</div><div>CR Sales Revenue - Rs. {c.amount}</div><div>CR Tax Payable - Rs. {c.tax}</div><div className="text-green-600 mt-1">✓ Auto Posted</div></div>)}
            </div>
          </div>
        )}

        {active==="Tax Ledger" && (
          <div className="bg-white border border-black p-4"><h2 className="font-bold">TAX LEDGER ROUTING</h2><p className="text-xs">Collected taxes auto-routed to Output Tax Liability Ledger</p>
          <div className="mt-4 border p-3 text-xs">Total Output Tax Liability: Rs. {challans.reduce((s,c)=>s+c.tax,0)}<br/>Ledger: 2201 - Output Tax - Sales</div></div>
        )}

        {active==="Reconciliation" && <div className="bg-white border border-black p-4"><h2 className="font-bold">PAYMENT RECONCILIATION</h2><p className="text-xs mt-2">Incoming payments auto-clear open invoices, Bank/Cash ledger updated.</p><div className="mt-4 text-xs bg-yellow-100 p-2">Demo: No open payments - All reconciled</div></div>}

        {active==="Approval Workflow" && (
          <div className="bg-white border border-black p-4"><h2 className="font-bold">APPROVAL WORKFLOW - Manager / Finance Head</h2>
            {challans.map(c=><div key={c.id} className="flex justify-between border p-2 mt-2 text-xs"><span>{c.id} - {c.party} - Rs.{c.amount}</span><button onClick={()=>setChallans(challans.map(x=>x.id===c.id?{...x, approved:!x.approved}:x))} className={`${c.approved?'bg-green-600':'bg-red-600'} text-white px-3 py-1`}>{c.approved?'Approved':'Approve'}</button></div>)}
          </div>
        )}

        {active==="Reporting & Audit" && <div className="bg-white border border-black p-4 text-xs"><h2 className="font-bold">REPORTING & AUDIT TRAIL</h2><ul className="list-disc ml-5 mt-3"><li>Challan Register: {challans.length} challans</li><li>AR Aging: Total AR Rs. {challans.reduce((s,c)=>s+c.amount+c.tax,0)}</li><li>Sales Revenue: Rs. {challans.reduce((s,c)=>s+c.amount,0)}</li><li>Tax Liability: Rs. {challans.reduce((s,c)=>s+c.tax,0)}</li><li>Audit: Every action logged with user + timestamp</li></ul></div>}

        {active==="Admin Console" && <div className="bg-white border border-black p-4 text-xs"><h2 className="font-bold">ADMIN CONSOLE</h2><p>Rule Config, User Management (Dispatch, Finance, Admin, Management), Ledger Mapping</p><div className="grid grid-cols-2 gap-2 mt-4"><input placeholder="Add New User Email" className="border p-2"/><select className="border p-2"><option>Dispatch</option><option>Finance</option><option>Admin</option><option>Management</option></select></div></div>}
      </div>
    </div>
  );
}
