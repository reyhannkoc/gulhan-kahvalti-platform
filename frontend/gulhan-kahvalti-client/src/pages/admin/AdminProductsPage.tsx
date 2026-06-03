import { type FormEvent, useEffect, useMemo, useState } from 'react'
import { Button } from '../../components/ui/Button'
import { EmptyState } from '../../components/ui/EmptyState'
import { FormField } from '../../components/ui/FormField'
import { Input } from '../../components/ui/Input'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { getApiErrorMessage } from '../../services/api'
import { categoryService } from '../../services/categoryService'
import { productService } from '../../services/productService'
import type { Category, Product, ProductCreateRequest } from '../../types'
import { formatPrice } from '../../utils/formatPrice'

interface ProductFormState {
  id?: number
  name: string
  description: string
  price: string
  stock: string
  imageUrl: string
  isActive: boolean
  categoryId: string
}

const emptyForm: ProductFormState = {
  name: '',
  description: '',
  price: '',
  stock: '',
  imageUrl: '',
  isActive: true,
  categoryId: '',
}

export function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [form, setForm] = useState<ProductFormState>(emptyForm)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const isEditing = useMemo(() => form.id !== undefined, [form.id])

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      setLoading(true)
      setError(null)
      const [nextProducts, nextCategories] = await Promise.all([
        productService.getAll(),
        categoryService.getAll(),
      ])
      setProducts(nextProducts)
      setCategories(nextCategories)
    } catch (err) {
      setError(getApiErrorMessage(err, 'Admin ürün verileri yüklenemedi.'))
    } finally {
      setLoading(false)
    }
  }

  function resetForm() {
    setForm(emptyForm)
  }

  function editProduct(product: Product) {
    setForm({
      id: product.id,
      name: product.name,
      description: product.description ?? '',
      price: product.price.toString(),
      stock: product.stock.toString(),
      imageUrl: product.imageUrl ?? '',
      isActive: product.isActive,
      categoryId: product.categoryId.toString(),
    })
    setMessage(null)
    setError(null)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError(null)
    setMessage(null)

    const payload: ProductCreateRequest = {
      name: form.name,
      description: form.description || null,
      price: Number(form.price),
      stock: Number(form.stock),
      imageUrl: form.imageUrl || null,
      isActive: form.isActive,
      categoryId: Number(form.categoryId),
    }

    try {
      if (isEditing && form.id) {
        await productService.update(form.id, payload)
        setMessage('Ürün güncellendi.')
      } else {
        await productService.create(payload)
        setMessage('Ürün oluşturuldu.')
      }

      resetForm()
      await loadData()
    } catch (err) {
      setError(getApiErrorMessage(err, 'Ürün kaydedilemedi.'))
    } finally {
      setSaving(false)
    }
  }

  async function deleteProduct(product: Product) {
    const confirmed = window.confirm(`${product.name} silinsin mi?`)

    if (!confirmed) {
      return
    }

    try {
      setError(null)
      setMessage(null)
      await productService.remove(product.id)
      setMessage('Ürün silindi.')
      await loadData()
    } catch (err) {
      setError(getApiErrorMessage(err, 'Ürün silinemedi.'))
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-stone-950 sm:text-2xl dark:text-white">Ürün Yönetimi</h1>
        <p className="mt-1 text-sm text-stone-600 dark:text-slate-300">Admin ürün ekleme, düzenleme ve silme.</p>
      </div>

      {message ? <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-200">{message}</p> : null}
      {error ? <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-400/10 dark:text-red-200">{error}</p> : null}

      <form className="grid gap-4 rounded-lg border border-stone-200 bg-stone-50 p-3 sm:p-4 lg:grid-cols-2 dark:border-white/10 dark:bg-slate-950/60" onSubmit={handleSubmit}>
        <FormField htmlFor="productName" label="Ürün adı">
          <Input
            id="productName"
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            required
            value={form.name}
          />
        </FormField>
        <FormField htmlFor="categoryId" label="Kategori">
          <select
            className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100 dark:border-white/15 dark:bg-slate-950 dark:text-white dark:focus:border-cyan-300 dark:focus:ring-cyan-400/20"
            id="categoryId"
            onChange={(event) => setForm((current) => ({ ...current, categoryId: event.target.value }))}
            required
            value={form.categoryId}
          >
            <option value="">Kategori seçin</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </FormField>
        <FormField htmlFor="price" label="Fiyat">
          <Input
            id="price"
            min="0"
            onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))}
            required
            step="0.01"
            type="number"
            value={form.price}
          />
        </FormField>
        <FormField htmlFor="stock" label="Stok">
          <Input
            id="stock"
            min="0"
            onChange={(event) => setForm((current) => ({ ...current, stock: event.target.value }))}
            required
            type="number"
            value={form.stock}
          />
        </FormField>
        <FormField htmlFor="imageUrl" label="Görsel URL">
          <Input
            id="imageUrl"
            onChange={(event) => setForm((current) => ({ ...current, imageUrl: event.target.value }))}
            value={form.imageUrl}
          />
        </FormField>
        <label className="flex items-center gap-2 pt-7 text-sm text-stone-700 dark:text-slate-200">
          <input
            checked={form.isActive}
            onChange={(event) => setForm((current) => ({ ...current, isActive: event.target.checked }))}
            type="checkbox"
          />
          Aktif
        </label>
        <div className="lg:col-span-2">
          <FormField htmlFor="description" label="Açıklama">
            <textarea
              className="min-h-24 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100 dark:border-white/15 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-cyan-300 dark:focus:ring-cyan-400/20"
              id="description"
              onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
              value={form.description}
            />
          </FormField>
        </div>
        <div className="grid gap-2 sm:flex sm:flex-wrap lg:col-span-2">
          <Button className="w-full sm:w-auto" disabled={saving || categories.length === 0} type="submit">
            {saving ? 'Kaydediliyor' : isEditing ? 'Ürünü güncelle' : 'Ürün ekle'}
          </Button>
          {isEditing ? (
            <Button className="w-full sm:w-auto" onClick={resetForm} variant="ghost">
              Vazgeç
            </Button>
          ) : null}
        </div>
      </form>

      {loading ? <LoadingSpinner label="Ürünler yükleniyor" /> : null}
      {!loading && products.length === 0 ? <EmptyState title="Henüz ürün yok" /> : null}
      {!loading && products.length > 0 ? (
        <div className="overflow-hidden rounded-lg border border-stone-200 dark:border-white/10">
          <div className="hidden grid-cols-[minmax(0,1fr)_120px_100px_160px] bg-stone-100 px-4 py-3 text-sm font-semibold text-stone-700 md:grid dark:bg-slate-950 dark:text-slate-200">
            <span>Ürün</span>
            <span>Fiyat</span>
            <span>Stok</span>
            <span className="text-right">İşlem</span>
          </div>
          <div className="divide-y divide-stone-200 bg-white dark:divide-white/10 dark:bg-slate-900">
            {products.map((product) => (
              <article className="grid gap-3 px-4 py-4 md:grid-cols-[minmax(0,1fr)_120px_100px_160px] md:items-center" key={product.id}>
                <div className="min-w-0">
                  <h2 className="font-semibold text-stone-900 dark:text-white">{product.name}</h2>
                  <p className="text-sm text-stone-600 dark:text-slate-300">{product.categoryName || 'Kategori yok'}</p>
                </div>
                <span className="text-sm text-stone-700 dark:text-slate-200">{formatPrice(product.price)}</span>
                <span className="text-sm text-stone-700 dark:text-slate-200">{product.stock}</span>
                <div className="grid gap-2 sm:flex md:justify-end">
                  <Button className="w-full sm:w-auto" onClick={() => editProduct(product)} variant="ghost">
                    Düzenle
                  </Button>
                  <Button className="w-full sm:w-auto" onClick={() => deleteProduct(product)} variant="danger">
                    Sil
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  )
}
