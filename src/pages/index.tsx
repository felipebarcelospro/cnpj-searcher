import { Button } from '@chakra-ui/button'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { Box, Container, Grid, Heading } from '@chakra-ui/layout'
import { useState } from 'react'

type Business = {
  type: string
  name: string
  uf: string
  phone: string
  email: string
  createdAt: string
}

export default function Home() {
  const [search, setSearch] = useState('')
  const [business, setBusiness] = useState<Business | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    setLoading(true)

    const res = await fetch(`/api/cnpj/${search}`)
    const data = await res.json()

    if (!data) {
      alert('CNPJ Not Found')
    }

    setBusiness(data)

    setLoading(false)
  }

  return (
    <Container w="container.xl" py="16">
      <Box>
        <InputGroup size="md">
          <Input
            pr="7rem"
            type="text"
            placeholder="Insira o CNPJ"
            onChange={e => setSearch(e.target.value)}
            disabled={loading}
          />
          <InputRightElement width="7rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={handleSearch}
              isLoading={loading}
            >
              Pesquisar
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>
      {business && (
        <Box
          mt="8"
          border="1px solid"
          borderColor="gray.100"
          p="4"
          borderRadius="base"
        >
          <Grid gridTemplateColumns="4fr 1fr 0.5fr" gap="5" marginBottom="6">
            <Box>
              <Heading fontSize="xs" color="gray.400">
                NOME
              </Heading>
              <Heading fontSize="md">{business.name}</Heading>
            </Box>
            <Box>
              <Heading fontSize="xs" color="gray.400">
                DATA
              </Heading>
              <Heading fontSize="md">{business.createdAt}</Heading>
            </Box>
            <Box>
              <Heading fontSize="xs" color="gray.400">
                UF
              </Heading>
              <Heading fontSize="md">{business.uf}</Heading>
            </Box>
          </Grid>
          <Grid gridTemplateColumns="4fr 2fr 1fr" gap="2">
            <Box>
              <Heading fontSize="xs" color="gray.400">
                EMAIL
              </Heading>
              <Heading fontSize="md">{business.phone}</Heading>
            </Box>
            <Box>
              <Heading fontSize="xs" color="gray.400">
                TELEFONE
              </Heading>
              <Heading fontSize="md">{business.email}</Heading>
            </Box>
          </Grid>
        </Box>
      )}
    </Container>
  )
}
