'use client'

import { Badge } from '@/collections/Badge'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function Page() {
  const [tabledata, setTabledata] = useState({
    id: String,
    orderDate: String,
    orderAmount: Number,
    shipingcharge: String,
    addressInfo: String,
    userInfo: String,
    mobile: String,
    currency: String,
    status: String,
    OrderBy: String,
    Products: [],
  })
  const [id, setOrderId] = useState('')
  const [loading, setLoading] = useState(true)

  const searchParams = useSearchParams()

  useEffect(() => {
    const orderId = searchParams.get('orderId') || 0
    setOrderId(orderId.toString())
  }, [searchParams])

  useEffect(() => {
    if (id) {
      getOrderInfo()
    }
  }, [id])

  const getOrderInfo = async () => {
    try {
      const data_reponse = await fetch('/api/orders/' + id)
      const response = await data_reponse.json()
      setTabledata(response)
      console.log('order details : ', JSON.stringify(response))
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <main>
        <article>
          <Badge />

          <div style={{ padding: '20px' }}>
            {loading ? (
              <p>Loading data...</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <th style={thStyle}>Icon</th>
                    <th style={thStyle}>Name</th>
                    <th style={thStyle}>Weight</th>
                    <th style={thStyle}>Quantity</th>
                    <th style={thStyle}>Price</th>
                    <th style={thStyle}>Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {tabledata?.Products?.map((item: any) => (
                    <tr key={item.id} style={{ textAlign: 'center' }}>
                      <td style={tdStyle}>
                        <img width={100} src={item.image} />
                      </td>
                      <td style={tdStyle}>{item.title}</td>
                      <td style={tdStyle}>{item.weight}</td>
                      <td style={tdStyle}>{item.quantity}</td>
                      <td style={tdStyle}>{item.price}</td>
                      <td style={tdStyle}>{item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>

                <thead>
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <th style={thStyle}> </th>
                    <th style={thStyle}> </th>
                    <th style={thStyle}> </th>
                    <th style={thStyle}> </th>
                    <th style={thStyle}>Total</th>
                    <th style={thStyle}>
                      {`Amount : ${tabledata?.currency} ${tabledata?.orderAmount}`}
                    </th>
                  </tr>
                </thead>
              </table>
            )}
          </div>
        </article>
      </main>
    </>
  )
}

// 🎨 Inline Styles for Table
const thStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  backgroundColor: '#FFF',
  color: 'white',
}

const tdStyle = {
  border: '1px solid #ddd',
  padding: '8px',
}
