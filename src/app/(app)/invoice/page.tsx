'use client'

import { Badge } from '@/collections/Badge'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

// Function to Convert Image URL to Base64
const getBase64Image = async (imgUrl) => {
  const response = await fetch(imgUrl)
  const blob = await response.blob()
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onloadend = () => {
      resolve(reader.result) // Base64 string
    }
  })
}

export default function Page() {
  const [tabledata, setTabledata] = useState([])
  const [id, setOrderId] = useState('')
  const [loading, setLoading] = useState(true)

  const searchParams = useSearchParams()

  useEffect(() => {
    const orderId = searchParams.get('orderId') || 0
    setOrderId(orderId)
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

  async function downloadinvoice(tabledata) {
    if (!tabledata?.Products?.length) {
      alert('No products to display!')
      return
    }

    const pdf = new jsPDF('portrait')
    pdf.setFontSize(18)
    pdf.text('NANA online shopping - Order invoice', 50, 15)
    pdf.text(
      '------------------------------------------------------------------------------',
      30,
      20,
    )

    pdf.setFontSize(10)
    pdf.text(`Order id : ${tabledata?.orderid}`, 20, 35)
    pdf.text(`Order date : ${tabledata?.orderDate}`, 20, 40)
    pdf.text(`Amount : ${tabledata?.currency} ${tabledata?.orderAmount}`, 20, 45)
    pdf.text(`Mobile : ${tabledata?.mobile}`, 20, 50)
    pdf.text(`Status : ${tabledata?.status}`, 20, 55)
    pdf.text(`Warehouse : ${tabledata?.warehouseid?.name}`, 20, 60)
    pdf.text(`Warehouse mobile : ${tabledata?.warehouseid?.mobile}`, 20, 65)

    // Convert all images to Base64 first
    const productArray = await Promise.all(
      tabledata.Products.map(async (item) => {
        const base64Image = await getBase64Image(item.image)
        return {
          image: base64Image,
          name: item.name,
          weight: item.weight,
          price: item.price,
          quantity: item.quantity,
        }
      }),
    )

    // Prepare table data without images
    const tableBody = productArray.map((item) => [
      '',
      item.name,
      item.weight,
      item.quantity,
      item.price,
      item.quantity * item.price,
    ])

    pdf.autoTable({
      startX: 20,
      startY: 70,
      head: [['Icon', 'Name', 'Weight', 'Quantity', 'Price', 'Cost']],
      body: tableBody,
      styles: {
        lineHeight: 15.5,
        valign: 'middle',
      },
      didDrawCell: function (data) {
        if (data.section === 'body' && data.column.index === 0) {
          const image = productArray[data.row.index]?.image
          if (image) {
            pdf.addImage(image, 'JPEG', data.cell.x + 3, data.cell.y + 3, 5, 5) // Adjusted size
          }
        }
      },
      foot: [[' ', ' ', ' ', ' ', 'Total', `${tabledata?.currency} ${tabledata?.orderAmount}`]],
    })

    pdf.save(`Order-${tabledata?.orderid}.pdf`)
  }

  return (
    <>
      <main>
        <article>
          <Badge />
          <p>
            <button onClick={() => downloadinvoice(tabledata)}>⬇️ Download PDF</button>
          </p>

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
                  {tabledata?.Products?.map((item) => (
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
                      {tabledata?.currency} {tabledata?.orderAmount}
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
  backgroundColor: '#4CAF50',
  color: 'white',
}

const tdStyle = {
  border: '1px solid #ddd',
  padding: '8px',
}
