import Link from 'next/link'
import React from 'react'
import config from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Badge } from '@/collections/Badge'
import { Background } from '@/collections/Background'

const Page = async () => {
  const payload = await getPayloadHMR({
    config,
  })

  return (
    <>
      <main>
        <article>
          <Badge warehousename={''} />

          <p>
            {' '}
            NANA App – Fresh Groceries at Your Doorstep One-Stop Online Grocery Store NANA App makes
            grocery shopping effortless with fresh fruits, vegetables, and daily essentials
            delivered straight to your home. Enjoy a hassle-free experience with quality products
            and reliable service. Why Choose NANA? <br />✅ Fresh & Quality Products – Handpicked
            fruits, vegetables, and groceries delivered with care. <br />✅ Convenient Home Delivery
            – Get your essentials delivered to your doorstep, saving you time and effort. <br />✅
            Cash on Delivery (COD) – Pay securely at the time of delivery. <br />✅ Fast & Reliable
            Service <br />– We currently serve select locations with quick and efficient delivery.
          </p>

          <p>
            {' '}
            What You Can Buy? <br />
            🛒 Fruits & Vegetables – Farm-fresh, organic, and seasonal produce. <br />
            🛒 Groceries & Essentials – Flour, rice, lentils, dairy, spices, and more. <br />
            🛒 Ready-to-Eat & Packaged Food – Snacks, beverages, frozen food, and instant meals.
          </p>

          <p>
            {' '}
            How It Works? <br />
            1️⃣ Browse & Select – Explore a wide range of fresh products.
            <br /> 2️⃣ Place Your Order – Add items to your cart and confirm your order. <br />
            3️⃣ Quick Delivery – Sit back while we deliver to your doorstep. <br />
            4️⃣ Pay on Delivery <br />– Enjoy the flexibility of COD payment. 📍 Currently available
            in limited areas – expanding soon!
            <br />
            <br />
            <Link href="https://play.google.com/store/apps/details?id=com.nanastore">
              🚀 Download the NANA App Now
            </Link>{' '}
            and experience fresh, fast, and convenient grocery shopping!
          </p>

          <p>
            <Link href="/admin">Admin</Link>
          </p>
        </article>
      </main>
      {/* <Background /> */}
    </>
  )
}

export default Page
