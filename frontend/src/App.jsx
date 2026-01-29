import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

const App = () => {

  const URL = 'http://localhost:5000/'

  const [productObj, setProductObj] = useState({
    productName: "",
    category: "",
    stock: 0,
    price: 0
  })

  const [products, setProducts] = useState([])
  const [editId, setEditId] = useState(null)

  const storedata = async (e) => {
    e.preventDefault()

    try {
      if (editId) {
        const res = await axios.put(`${URL}v1/updateProduct/${editId}`, productObj)
        alert(res.data.message)
        setEditId(null)
      } else {
        const res = await axios.post(`${URL}v1/createproduct`, productObj)
        alert(res.data.message)
      }

      setProductObj({
        productName: "",
        category: "",
        stock: 0,
        price: 0
      })

      getAllProducts()
    } catch (err) {
      alert("Operation failed")
    }
  }

  const getAllProducts = async () => {
    try {
      const res = await axios.get(`${URL}v1/getAllProducts`)
      setProducts(res.data.response || [])
    } catch (err) {
      console.error(err)
    }
  }

  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(`${URL}v1/deleteProduct/${id}`)
      alert(res.data.message)
      getAllProducts()
    } catch (err) {
      alert("Delete failed")
    }
  }

  const editProduct = (product) => {
    setProductObj({
      productName: product.productName,
      category: product.category,
      stock: product.stock,
      price: product.price
    })
    setEditId(product._id)
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <>
      <form onSubmit={storedata}>
        <div className="container">
          <h1>{editId ? "Update Product" : "Add Product"}</h1>

          <input
            value={productObj.productName}
            placeholder="Product name"
            onChange={(e) =>
              setProductObj({ ...productObj, productName: e.target.value })
            }
          />

          <input
            value={productObj.category}
            placeholder="Category"
            onChange={(e) =>
              setProductObj({ ...productObj, category: e.target.value })
            }
          />

          <input
            type="number"
            value={productObj.stock}
            placeholder="Stock"
            onChange={(e) =>
              setProductObj({ ...productObj, stock: Number(e.target.value) })
            }
          />

          <input
            type="number"
            value={productObj.price}
            placeholder="Price"
            onChange={(e) =>
              setProductObj({ ...productObj, price: Number(e.target.value) })
            }
          />

          <button type="submit">
            {editId ? "Update" : "Submit"}
          </button>
        </div>
      </form>

      <h2>Product List</h2>

      {products.length === 0 && <p>No products found</p>}

      {products.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Price (₹)</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p, index) => (
              <tr key={p._id}>
                <td>{index + 1}</td>
                <td>{p.productName}</td>
                <td>{p.category}</td>
                <td>{p.stock}</td>
                <td>{p.price}</td>
                <td>
                  <button className="edit-btn" onClick={() => editProduct(p)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => deleteProduct(p._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default App
