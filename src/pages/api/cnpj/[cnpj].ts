import type { NextApiRequest, NextApiResponse } from 'next'

type Business = {
  type: string
  name: string
  uf: string
  phone: string
  email: string
  createdAt: string
}

type Error = {
  errorCode: number
  errorMessage: string
}

export default async (
  request: NextApiRequest,
  response: NextApiResponse<Business | Error>
) => {
  const { cnpj } = request.query

  const res = await fetch(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`)
  const data = await res.json()

  if (!data) {
    response.status(404).json({ errorCode: 404, errorMessage: 'Not Found' })
  }

  response.status(200).json({
    type: data.tipo,
    name: data.nome,
    uf: data.uf,
    phone: data.telefone,
    email: data.email,
    createdAt: data.data_situacao
  })
}
