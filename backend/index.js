const express = require("express")
const cors = require("cors")
const db = require("./config/db.js")
const productmodel = require('./models/products.js')

const app = express()

app.use(express.json())
app.use(cors())

// ================= CREATE =================
app.post('/v1/createproduct', async (req, res) => {
  try {
    const resdata = req.body
    let saved

    if (resdata.length>0) {
      saved = await productmodel.insertMany(resdata)
    } else {
      saved = await productmodel.create(resdata)
    }

    return res.status(201).send({
      status: true,
      message: "Product created successfully",
      response: saved
    })

  } catch (e) {
    return res.status(500).send({
      status: false,
      message: "Exception occurred",
      error: e.message
    })
  }
})


// ================= READ =================
app.get('/v1/getAllProducts', async (req, res) => {
  try {
    const d = await productmodel.find()

    return res.status(200).send({
      status: true,
      message: "Products fetched successfully",
      response: d
    })

  } catch (e) {
    return res.status(500).send({
      status: false,
      message: "Exception occurred",
      error: e.message
    })
  }
})


// ================= UPDATE =================
app.put('/v1/updateProduct/:id', async (req, res) => {
  try {
    const updated = await productmodel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }   // returns updated document
    )

    if (!updated) {
      return res.status(404).send({
        status: false,
        message: "Product not found"
      })
    }

    return res.status(200).send({
      status: true,
      message: "Product updated successfully",
      response: updated
    })

  } catch (e) {
    return res.status(500).send({
      status: false,
      message: "Exception occurred",
      error: e.message
    })
  }
})


// ================= DELETE =================
app.delete('/v1/deleteProduct/:proid', async (req, res) => {
  try {
    const d = await productmodel.findByIdAndDelete(req.params.proid)

    if (!d) {
      return res.status(404).send({
        status: false,
        message: "Product not found"
      })
    }

    return res.status(200).send({
      status: true,
      message: "Product deleted successfully",
      response: d
    })

  } catch (e) {
    return res.status(500).send({
      status: false,
      message: "Exception occurred",
      error: e.message
    })
  }
})

app.listen(5000, () => console.log("Server started on port 5000"))
