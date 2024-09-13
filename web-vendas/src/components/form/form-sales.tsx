'use client'
import { cn } from '@/lib/utils'
import { ChevronsUpDown, Check } from 'lucide-react'
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useToast,
} from '../ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Page } from '@/types/page'
import { Customer } from '@/types/customer'
import { customerSchema } from '@/schema/customer-schema'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Product } from '@/types/product'
import { getById } from '@/actions/product/get-by-id'
import { itemSalesProductSchema } from '@/schema/item-sales-product-schema'
import { DataTableSalesProduct } from '../data-table-sales-product/data-table-sales-product'

const FormSchema = z.object({
  customers: customerSchema,
  product: itemSalesProductSchema
    .array()
    .min(1, { message: 'Selecione pelo menos um item' }),
})

type Form = z.infer<typeof FormSchema>

type FormSalesProps = {
  customers: Page<Customer>
  products: Product[]
}

type AddProductProps = {
  id?: string
  product?: Product
  qtd?: number
}
export function FormSales({
  customers = {
    content: [],
    number: 0,
    totalElements: 0,
    totalPages: 0,
    size: 0,
    first: 0,
  },
  products = [],
}: FormSalesProps) {
  const [addProduct, setAddProduct] = useState<AddProductProps>(
    {} as AddProductProps,
  )
  const [open, setOpen] = useState(false)

  const { toast } = useToast()
  const form = useForm<Form>({
    resolver: zodResolver(FormSchema),
  })
  const { append } = useFieldArray({
    control: form.control,
    name: 'product',
  })

  const pathname = usePathname()
  const { replace } = useRouter()
  const searchParams = useSearchParams()

  console.log(products)

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  function handleSearch(value: string) {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set('nome', value)
    } else {
      params.delete('nome')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  function handleChangeProduct(e: React.ChangeEvent<HTMLInputElement>) {
    const id = e.target.value
    if (id) {
      getById(id)
        .then((product) => {
          setAddProduct({
            id,
            product,
          })
        })
        .catch(() => {
          toast({
            title: 'Atenção',
            description: 'Produto não encontrado',
            variant: 'warn',
            duration: 3000,
          })
          setAddProduct({})
        })
    }
  }

  function handleAddProduct() {
    const { product, qtd } = addProduct

    if (!product || !qtd) {
      return
    }

    const existingProductIndex = form
      .getValues('product')
      .findIndex((item) => item.product.id === product.id)

    if (existingProductIndex !== -1) {
      const updatedProducts = form.getValues('product').map((item, index) => {
        if (index === existingProductIndex) {
          return { ...item, qtd: item.qtd + qtd }
        }
        return item
      })

      form.setValue('product', updatedProducts)
    } else {
      append({ product, qtd })
    }

    setAddProduct({})
  }

  function disableAddProduct() {
    return !addProduct.product || !addProduct.qtd
  }
  console.log(addProduct)
  // localhost:3000/inicio/vendas?nome=pe
  http: return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="customers"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Cliente</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'w-full justify-between',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value
                        ? customers.content.find(
                            (customer) => customer.id === field.value.id,
                          )?.nome
                        : 'Selecione o cliente'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Busque um cliente..."
                      onValueChange={handleSearch}
                    />
                    <CommandList>
                      <CommandEmpty>Nenhuma cliente encontrado.</CommandEmpty>
                      <CommandGroup>
                        {customers.content.map((customer) => (
                          <CommandItem
                            className="cursor-pointer"
                            value={customer.nome}
                            key={customer.id}
                            onSelect={() => {
                              form.setValue('customers', customer)
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                customer.nome ===
                                  (field.value && field.value.nome)
                                  ? 'opacity-100'
                                  : 'opacity-0',
                              )}
                            />
                            {customer.nome}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>Este sera o cliente da venda</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid w-full items-end gap-2 md:grid-cols-12">
          <div className="col-span-2 w-full">
            <Input
              label="Codigo"
              className=""
              value={addProduct.id || ''}
              onBlur={handleChangeProduct}
              onChange={(e) =>
                setAddProduct({ ...addProduct, id: e.target.value })
              }
            />
          </div>
          <div className="col-span-2 md:col-span-6">
            {/* <Input
              label="Produto"
              className="w-full"
              value={(addProduct.product && addProduct.product.nome) || ""}
            /> */}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {addProduct.product
                    ? addProduct.product.nome
                    : 'Selecione o Produto...'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Busque um produto..." />
                  <CommandList>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {products.map((product) => (
                        <CommandItem
                          key={product.id!}
                          value={product.nome}
                          onSelect={() => {
                            setAddProduct({
                              ...addProduct,
                              id: product.id!.toString(),
                              product,
                            })
                            setOpen(false)
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              addProduct.product?.nome ===
                                (product.nome || addProduct.product?.nome)
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                          {product.nome}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="col-span-2 w-full">
            <Input
              label="Quantidade"
              className=""
              value={addProduct.qtd || ''}
              onChange={(e) =>
                setAddProduct({ ...addProduct, qtd: parseInt(e.target.value) })
              }
            />
          </div>
          <div className="col-span-2 grid w-full justify-end md:block">
            <Button
              type="button"
              onClick={handleAddProduct}
              className="w-full"
              variant={'secondary'}
              disabled={disableAddProduct()}
            >
              Adicionar
            </Button>
          </div>
        </div>

        <DataTableSalesProduct data={form.watch('product')} />
        <Button type="submit">Finalizar</Button>
      </form>
    </Form>
  )
}
