'use client'

import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { useEffect, useState } from 'react'

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

  async function demo(tabledata) {
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
        // if (item.index === 0) {
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
      // ✅ Increase Row Height
      // didParseCell: function (data) {
      //   if (data.section === 'body') {
      //     data.cell.height = 320 // Set desired row height (adjust as needed)
      //   }
      // },
      styles: {
        lineHeight: 15.5, // ✅ Increase this value to add more height to rows
        valign: 'middle', // Optional: Vertically align content to the middle
      },
      didDrawCell: function (data) {
        // ✅ Render images ONLY in the body section
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

  useEffect(() => {
    getOrderInfo()
  }, [])

  const getOrderInfo = async () => {
    let data = await fetch('/api/orders/67a097dd0e7a4ad5ae34998b')
    let response = await data.json()
    setTabledata(response)
    console.log('order details : ', JSON.stringify(response))
  }

  return (
    <>
      <main style={{ backgroundColor: 'gray' }}>
        <div>
          <button onClick={() => demo(tabledata)}>Download PDF</button>
        </div>
      </main>
    </>
  )
}
