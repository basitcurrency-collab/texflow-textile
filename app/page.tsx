"use client";
import { useState } from "react";

export default function TexFlow() {
  const [rows, setRows] = useState([
    { desc: "", color: "", fabric: "", lot: "", rolls: "", recv: "", del: "" }
  ]);
  const [challanNo, setChallanNo] = useState("CH-001");
  const [party, setParty] = useState("");
  const [driver, setDriver] = useState("");
  const [vehicle, setVehicle] = useState("");

  const addRow = () => setRows([...rows, { desc: "", color: "", fabric: "", lot: "", rolls: "", recv: "", del: "" }]);

  const update = (i: number, key: string, val: string) => {
    const newRows = [...rows];
    (newRows[i] as any)[key] = val;
    setRows(newRows);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-2 md:p-4">
      <div className="bg-white max-w-7xl mx-auto p-4 shadow">

        {/* HEADER */}
        <div className="text-center border-2 border-black p-3">
          <h1 className="text-2xl font-black">TEXFLOW TEXTILE</h1>
          <p className="text-xs">Factory Address Karachi | 0300-XXXXXXX</p>
          <div className="flex justify-center gap-2 mt-2 text-xs font-bold">
            <span className="border border-black px-3 py-1">KACHA</span>
            <span className="border border-black px-3 py-1">PAKKA</span>
            <span className="border border-black px-3 py-1">GATE PASS</span>
          </div>
        </div>

        {/* TOP DETAILS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 border border-black border-t-0 p-3">
          <div><label className="text-[10px] font-bold">CHALLAN NO</label><input value={challanNo} onChange={e=>setChallanNo(e.target.value)} className="w-full border border-black p-1 text-sm" /></div>
          <div><label className="text-[10px] font-bold">DATE</label><input type="date" className="w-full border border-black p-1 text-sm" /></div>
          <div><label className="text-[10px] font-bold">DRIVER NAME</label><input value={driver} onChange={e=>setDriver(e.target.value)} placeholder="Driver Name" className="w-full border border-black p-1 text-sm" /></div>
          <div><label className="text-[10px] font-bold">VEHICLE NO</label><input value={vehicle} onChange={e=>setVehicle(e.target.value)} placeholder="e.g KHI-1234" className="w-full border border-black p-1 text-sm" /></div>
          <div className="col-span-2 md:col-span-4"><label className="text-[10px] font-bold">PARTY / FACTORY NAME</label><input value={party} onChange={e=>setParty(e.target.value)} className="w-full border border-black p-1 text-sm" /></div>
        </div>

        {/* TABLE */}
        <table className="w-full border-collapse border border-black mt-3 text-xs">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-black p-1">S.No</th>
              <th className="border border-black p-1">DESCRIPTION</th>
              <th className="border border-black p-1">COLOR</th>
              <th className="border border-black p-1">FABRIC</th>
              <th className="border border-black p-1">LOT NO</th>
              <th className="border border-black p-1">ROLLS</th>
              <th className="border border-black p-1">RECV WT</th>
              <th className="border border-black p-1">DEL WT</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td className="border border-black text-center">{i+1}</td>
                <td className="border border-black"><input value={r.desc} onChange={e=>update(i,'desc',e.target.value)} className="w-full p-1 outline-none" /></td>
                <td className="border border-black"><input value={r.color} onChange={e=>update(i,'color',e.target.value)} className="w-full p-1 outline-none" /></td>
                <td className="border border-black"><input value={r.fabric} onChange={e=>update(i,'fabric',e.target.value)} className="w-full p-1 outline-none" /></td>
                <td className="border border-black"><input value={r.lot} onChange={e=>update(i,'lot',e.target.value)} className="w-full p-1 outline-none" /></td>
                <td className="border border-black"><input value={r.rolls} onChange={e=>update(i,'rolls',e.target.value)} className="w-full p-1 outline-none" /></td>
                <td className="border border-black"><input value={r.recv} onChange={e=>update(i,'recv',e.target.value)} className="w-full p-1 outline-none" /></td>
                <td className="border border-black"><input value={r.del} onChange={e=>update(i,'del',e.target.value)} className="w-full p-1 outline-none" /></td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={addRow} className="mt-2 bg-black text-white px-4 py-1 text-xs">+ ADD ROW</button>

        <div className="grid grid-cols-3 gap-10 mt-16 text-center text-xs font-bold">
          <div className="border-t border-black pt-1">Prepared By</div>
          <div className="border-t border-black pt-1">Authority Sign</div>
          <div className="border-t border-black pt-1">Receiver Sign</div>
        </div>

        <button onClick={()=>window.print()} className="w-full bg-green-600 text-white py-2 mt-6 font-bold print:hidden">PRINT / SAVE PDF</button>
      </div>
    </div>
  );
}
