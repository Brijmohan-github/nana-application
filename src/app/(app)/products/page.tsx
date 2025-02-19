'use client'

import { Badge } from '@/collections/Badge'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { BASE_URL, END_POINTS, IMG_URL } from '@/config'

export default function Page() {
  const [tabledata, setTabledata] = useState([])
  const [id, setWid] = useState('')
  const [loading, setLoading] = useState(true)
  const [showPopup, setShowPopup] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

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
      const data_response = await fetch(
        `${BASE_URL}${END_POINTS.WAREHOUSE_PRODUCT_UPDATE}?depth=2&fallback-locale=null&limit=200&where[wearhouseId][equals]=${id}`,
      )
      const response = await data_response.json()
      setTabledata(response?.docs)
      console.log('order details : ', response?.docs)
    } catch (error) {
      console.log('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditClick = (product: any) => {
    setLoading(true)
    setSelectedProduct(product)
    setShowPopup(true)
  }

  const onSuccessResult = (result: any) => {
    console.log('onSuccessResult fetching data:', result)
    setLoading(true)
    getOrderInfo()
    setLoading(false)
    // setTabledata((tabledata) =>
    //   tabledata.map(
    //     (item) => (item.id === result.id ? result : item), // Replace matching row with updated data
    //   ),
    // )
  }

  return (
    <>
      <main>
        <article>
          {' '}
          <Badge />
          {loading && (
            <p style={{ textAlign: 'center', padding: 20, border: 2, borderColor: 'red' }}>
              {' '}
              <img
                src="Fidget-spinner.gif"
                width="60"
                height="60"
                style={{ borderRadius: '16px' }}
                alt="Logo"
              />
            </p>
          )}
          <div style={{ padding: '20px' }}>
            {loading ? (
              <p>{}</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <th style={thStyle}>Icon</th>
                    <th style={thStyle}>Product</th>
                    <th style={thStyle}>Original Price</th>
                    <th style={thStyle}>Price</th>
                    <th style={thStyle}>Rank</th>
                    <th style={thStyle}>Status</th>
                    <th style={thStyle}>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {tabledata?.map((item) => (
                    <tr id={item.id} key={item.id} style={{ textAlign: 'center' }}>
                      <td style={tdStyle}>
                        <img
                          width={50}
                          src={
                            item.products.imageone?.url
                              ? `${IMG_URL}${item.products.imageone.url}`
                              : 'logo.jpeg'
                          }
                        />
                      </td>
                      <td style={tdStyle}>{item.products.title}</td>
                      <td style={tdStyle}>{item.originalprice}</td>
                      <td style={tdStyle}>{item.price}</td>
                      <td style={tdStyle}>{item.rank}</td>
                      <td style={tdStyle}>{item.status}</td>
                      <td style={tdStyle}>
                        <button onClick={() => handleEditClick(item)}>Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </article>
      </main>
      {showPopup && selectedProduct && (
        <EditPopup
          product={selectedProduct}
          onSuccessResult={onSuccessResult}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  )
}

function EditPopup({ product, onClose, onSuccessResult }) {
  // console.log('🚀 Brij  ~  EditPopup ~  product:', product)

  const [originalprice, setOriginalPrice] = useState(product.originalprice)
  const [price, setPrice] = useState(product.price)
  const [rank, setRank] = useState(product.rank)
  const [id, setId] = useState(product.id)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Updated Values:', { id, originalprice, price, rank })

    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    const raw = JSON.stringify({
      id: id,
      originalprice: originalprice,
      price: price,
      rank: rank,
    })

    const requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    fetch(`${BASE_URL}${END_POINTS.WAREHOUSE_PRODUCT_UPDATE}${id}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result)
        //getOrderInfo();
        onSuccessResult(result)
      })
      .catch((error) => console.error(error))

    onClose()
  }

  return (
    <div style={popupStyle}>
      <div style={popupContentStyle}>
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <label style={labelstyle}>Original Price:</label>
          <input
            type="hidden"
            value={id}
            // onChange={(e) => setId(e.target.value)}
          />
          <input
            type="number"
            value={originalprice}
            onChange={(e) => setOriginalPrice(e.target.value)}
          />

          <div style={labelstyle}>
            <label style={labelstyle}>Price:</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>

          <div style={labelstyle}>
            <label style={labelstyle}>Rank:</label>
            <input type="number" value={rank} onChange={(e) => setRank(e.target.value)} />
          </div>

          <div style={labelstyle}>
            <button type="submit" style={{ paddingRight: 10 }}>
              Save
            </button>{' '}
            &nbsp;
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const thStyle = { border: '1px solid #ddd', padding: '8px', backgroundColor: '#FFF', color: '#000' }
const tdStyle = { border: '1px solid #ddd', padding: '8px' }
const popupStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}
const popupContentStyle = {
  backgroundColor: '#FFF',
  padding: '20px',
  borderRadius: '8px',
  width: '400px',
  textAlign: 'center',
}
const labelstyle = { padding: 10 }
