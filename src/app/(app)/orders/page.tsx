'use client'

import { Badge } from '@/collections/Badge'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function Page() {
  const [tabledata, setTabledata] = useState([])
  const [id, setWid] = useState('')
  const [loading, setLoading] = useState(true)
  const [warehousename, setWarehousename] = useState('')

  const searchParams = useSearchParams()

  useEffect(() => {
    const Wid = searchParams.get('wid') || 0
    setWid(Wid.toString())

    if (Wid == '67b8acb1b0bbf82f075aff65') {
      setWarehousename('Beri Khurd')
    } else if (Wid == '6798dacd2d646fbcc4ec16a4') {
      setWarehousename('Kasli')
    } else if (Wid == '6795f9cb370a005539b72e14') {
      setWarehousename('Jhotwara')
    } else {
      alert('You are not authrize to access!')
    }
  }, [searchParams])

  useEffect(() => {
    if (id) {
      getOrderInfo()
    }
  }, [id])

  const getOrderInfo = async () => {
    try {
      const data_reponse = await fetch(
        '/api/orders/?depth=0&fallback-locale=null&limit=200&where[warehouseid][equals]=' + id,
      )
      const response = await data_reponse.json()
      setTabledata(response?.docs)
      console.log('order details : ', response?.docs)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  function formatDate(dateString: any) {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short', // 'Feb'
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }

    const date = new Date(dateString)
    return date.toLocaleString('en-GB', options).replace(',', '')
  }

  return (
    <>
      <main>
        <article>
          <view style={{ flexDirection: 'row' }}>
            <Badge warehousename={warehousename} />
          </view>
          <div style={{ padding: '20px' }}>
            {loading ? (
              <p>Loading data...</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <th style={thStyle}>Icon</th>
                    <th style={thStyle}>Date</th>
                    <th style={thStyle}>AddressInfo</th>
                    <th style={thStyle}>mobile</th>
                    <th style={thStyle}>Price</th>
                    <th style={thStyle}>User</th>
                    <th style={thStyle}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tabledata?.map((item: any) => (
                    <tr key={item.id} style={{ textAlign: 'center' }}>
                      <td style={tdStyle}>
                        <Link href={`invoice?orderId=${item.id}`} target="blank">
                          <img width={50} src={item.image || './images/pdf.png'} />
                        </Link>
                      </td>
                      <td style={tdStyle}>{formatDate(item.createdAt)}</td>
                      <td style={tdStyle}>{item.addressInfo}</td>
                      <td style={tdStyle}>{item.mobile}</td>
                      <td style={tdStyle}>{item.orderAmount}</td>
                      <td style={tdStyle}>{item.userInfo}</td>
                      <td style={tdStyle}>{item.status}</td>
                    </tr>
                  ))}
                </tbody>
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
  color: '#000',
}

const tdStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  with: '20%',
}
