import { type FormEvent, useEffect, useMemo, useState } from 'react'
import { Button } from '../../components/ui/Button'
import { EmptyState } from '../../components/ui/EmptyState'
import { FormField } from '../../components/ui/FormField'
import { Input } from '../../components/ui/Input'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { getApiErrorMessage } from '../../services/api'
import { categoryService } from '../../services/categoryService'
import type { Category } from '../../types'

interface CategoryFormState {
  id?: number
  name: string
  description: string
}

const emptyForm: CategoryFormState = {
  name: '',
  description: '',
}

export function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [form, setForm] = useState<CategoryFormState>(emptyForm)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const isEditing = useMemo(() => form.id !== undefined, [form.id])

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {
    try {
      setLoading(true)
      setError(null)
      setCategories(await categoryService.getAll())
    } catch (err) {
      setError(getApiErrorMessage(err, 'Kategoriler yuklenemedi.'))
    } finally {
      setLoading(false)
    }
  }

  function resetForm() {
    setForm(emptyForm)
  }

  function editCategory(category: Category) {
    setForm({
      id: category.id,
      name: category.name,
      description: category.description ?? '',
    })
    setMessage(null)
    setError(null)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError(null)
    setMessage(null)

    const payload = {
      name: form.name,
      description: form.description || null,
    }

    try {
      if (isEditing && form.id) {
        await categoryService.update(form.id, payload)
        setMessage('Kategori guncellendi.')
      } else {
        await categoryService.create(payload)
        setMessage('Kategori olusturuldu.')
      }

      resetForm()
      await loadCategories()
    } catch (err) {
      setError(getApiErrorMessage(err, 'Kategori kaydedilemedi.'))
    } finally {
      setSaving(false)
    }
  }

  async function deleteCategory(category: Category) {
    const confirmed = window.confirm(`${category.name} silinsin mi?`)

    if (!confirmed) {
      return
    }

    try {
      setError(null)
      setMessage(null)
      await categoryService.remove(category.id)
      setMessage('Kategori silindi.')
      await loadCategories()
    } catch (err) {
      setError(getApiErrorMessage(err, 'Kategori silinemedi.'))
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-950">Kategori Yonetimi</h1>
        <p className="mt-1 text-sm text-stone-600">Kategori ekleme, duzenleme ve silme.</p>
      </div>

      {message ? <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">{message}</p> : null}
      {error ? <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}

      <form className="grid gap-4 rounded-lg border border-stone-200 bg-stone-50 p-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <FormField htmlFor="categoryName" label="Kategori adi">
          <Input
            id="categoryName"
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            required
            value={form.name}
          />
        </FormField>
        <FormField htmlFor="categoryDescription" label="Aciklama">
          <Input
            id="categoryDescription"
            onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
            value={form.description}
          />
        </FormField>
        <div className="flex flex-wrap gap-2 md:col-span-2">
          <Button disabled={saving} type="submit">
            {saving ? 'Kaydediliyor' : isEditing ? 'Kategoriyi guncelle' : 'Kategori ekle'}
          </Button>
          {isEditing ? (
            <Button onClick={resetForm} variant="ghost">
              Vazgec
            </Button>
          ) : null}
        </div>
      </form>

      {loading ? <LoadingSpinner label="Kategoriler yukleniyor" /> : null}
      {!loading && categories.length === 0 ? <EmptyState title="Henuz kategori yok" /> : null}
      {!loading && categories.length > 0 ? (
        <div className="grid gap-3">
          {categories.map((category) => (
            <article className="flex flex-col gap-3 rounded-lg border border-stone-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between" key={category.id}>
              <div>
                <h2 className="font-semibold text-stone-900">{category.name}</h2>
                <p className="text-sm text-stone-600">{category.description || 'Aciklama yok'}</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => editCategory(category)} variant="ghost">
                  Duzenle
                </Button>
                <Button onClick={() => deleteCategory(category)} variant="danger">
                  Sil
                </Button>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  )
}
