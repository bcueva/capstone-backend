import * as tf from '@tensorflow/tfjs-node'
import pool from '../config/db.js'

let model
let baseDate

export async function trainModel() {
  const [rows] = await pool.query('SELECT date, amount FROM sales ORDER BY date ASC')
  const data = rows.map(row => ({
    date: new Date(row.date),
    amount: parseFloat(row.amount)
  }))

  baseDate = data[0].date
  const xs = data.map((_, i) => i)
  const ys = data.map(d => d.amount)

  const inputTensor = tf.tensor2d(xs, [xs.length, 1])
  const outputTensor = tf.tensor2d(ys, [ys.length, 1])

  model = tf.sequential()
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }))
  model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' })

  await model.fit(inputTensor, outputTensor, { epochs: 200 })
}

export async function predictSales(startDateStr, days = 7) {
  if (!model || !baseDate) throw new Error('Model not trained')

  const startDate = new Date(startDateStr)
  const dayIndex = Math.floor((startDate - baseDate) / (1000 * 60 * 60 * 24))
  if (dayIndex < 0) throw new Error('Date out of range')

  const xs = Array.from({ length: days }, (_, i) => [dayIndex + i])
  const input = tf.tensor2d(xs)
  const predictions = await model.predict(input).array()

  return predictions.map((value, i) => ({
    date: new Date(startDate.getTime() + i * 86400000).toISOString().split('T')[0],
    expectedSales: parseFloat(value[0].toFixed(2))
  }))
}
