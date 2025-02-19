'use client'

import { Badge } from '@/collections/Badge'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function Page() {
  const [tabledata, setTabledata] = useState([])
  const [id, setWid] = useState('')
  const [loading, setLoading] = useState(true)

  const searchParams = useSearchParams()

  useEffect(() => {
    const Wid = searchParams.get('wid') || 0
    setWid(Wid.toString())
  }, [searchParams])

  useEffect(() => {
    if (id) {
      getOrderInfo()
    }
  }, [id])

  const getOrderInfo = async () => {
    try {
      const data_reponse = await fetch(
        '/api/wearhouseproducts/?depth=2&fallback-locale=null&limit=200&where[wearhouseId][equals]=' +
          id,
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
  const IMG_URL = 'https://nana-application.vercel.app'

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
                    <th style={thStyle}>Product</th>
                    <th style={thStyle}>Originalprice</th>
                    <th style={thStyle}>Price</th>
                    <th style={thStyle}>Rank</th>
                    <th style={thStyle}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tabledata?.map((item: any) => (
                    <tr key={item.id} style={{ textAlign: 'center' }}>
                      <td style={tdStyle}>
                        <img
                          width={50}
                          src={`${IMG_URL}${item.products.imageone.url}` || 'logo.jpeg'}
                        />
                      </td>
                      <td style={tdStyle}>{item.products.title}</td>
                      <td style={tdStyle}>{item.originalprice}</td>
                      <td style={tdStyle}>{item.price}</td>
                      <td style={tdStyle}>{item.rank}</td>
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
}
