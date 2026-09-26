'use client';
import { useState } from 'react';

const orders = [
  { id: 'SO-1081', customer: 'Sitara Fabric Mills Ltd.', city: 'Faisalabad', rolls: '40 Rolls', amount: 'Rs. 790,000' },
  { id: 'SO-1082', customer: 'Nishat Textile', city: 'Lahore', rolls: '25 Rolls', amount: 'Rs. 450,000' },
];

export default function Page(){
  const [form, setForm] = useState({
    custEn: 'Sitara Fabric Mills Ltd.',
    custUr: 'ستارہ فیبرک ملز لمیٹڈ',
    millEn: 'TexFlow Textile Mills Ltd.',
    millUr: 'ٹیکس فلو ٹیکسٹائل ملز لمیٹڈ',
    city: 'Faisalabad',
    vehicle: 'FS-1234',
    rolls: '40',
    meters: '2000',
  });

  return (
    <div style={{padding:20, fontFamily:'system-ui', background:'#f5f5f5', minHeight:'100vh'}}>
      <div style={{maxWidth:1000, margin:'0 auto', background:'white', padding:20, borderRadius:12}}>
        <h1 style={{fontSize:22, fontWeight:'bold'}}>TexFlow - Textile Challan (Sales Order to Challan)</h1>
        
        <div style={{display:'flex', gap:20, marginTop:20}}>
          <div style={{width:'35%', border:'1px solid #ddd', padding:10, borderRadius:8}}>
            <b>PENDING SALES ORDERS</b>
            {orders.map(o=>(
              <div key={o.id} onClick={()=>setForm({...form, custEn:o.customer, city:o.city})} style={{border:'1px solid #ccc', padding:8, marginTop:8, cursor:'pointer'}}>
                {o.id}<br/>{o.customer}<br/>{o.rolls} - {o.amount}
              </div>
            ))}
          </div>

          <div style={{width:'65%'}}>
            <label>Customer Name (English)</label>
            <input value={form.custEn} onChange={e=>setForm({...form,custEn:e.target.value})} style={{width:'100%', border:'1px solid #ccc', padding:8, marginBottom:8}} />
            
            <label>Customer Name Urdu - کسٹمر کا نام اردو میں</label>
            <input dir="rtl" value={form.custUr} onChange={e=>setForm({...form,custUr:e.target.value})} style={{width:'100%', border:'1px solid #ccc', padding:8, marginBottom:8, textAlign:'right'}} />
            
            <label>Your Mill Name (English)</label>
            <input value={form.millEn} onChange={e=>setForm({...form,millEn:e.target.value})} style={{width:'100%', border:'1px solid #ccc', padding:8, marginBottom:8}} />
            
            <label>Company Name Urdu - مل کا نام اردو</label>
            <input dir="rtl" value={form.millUr} onChange={e=>setForm({...form,millUr:e.target.value})} style={{width:'100%', border:'1px solid #ccc', padding:8, marginBottom:8, textAlign:'right'}} />

            <button onClick={()=>window.print()} style={{background:'black', color:'white', padding:'10px 20px', borderRadius:6, marginTop:10}}>Print Challan (A4) - DC-9041</button>

            <div style={{border:'2px solid black', padding:15, marginTop:20}}>
              <h3 style={{textAlign:'center'}}><b>DELIVERY CHALLAN</b></h3>
              From: {form.millEn} / <span dir="rtl">{form.millUr}</span><br/>
              To: {form.custEn} / <span dir="rtl">{form.custUr}</span><br/>
              City: {form.city} | Vehicle: {form.vehicle}<br/>
              Rolls: {form.rolls} | Meters: {form.meters}<br/>
              <div style={{display:'flex', justifyContent:'space-between', marginTop:40}}>
                <span>Receiver Sign</span><span>Gate Pass</span><span>For {form.millEn}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
