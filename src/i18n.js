import { ref, computed, watchEffect } from 'vue'

function initialLang() {
  try {
    return localStorage.getItem('lang') === 'ar' ? 'ar' : 'en'
  } catch {
    return 'en'
  }
}

export const lang = ref(initialLang())
export const isAr = computed(() => lang.value === 'ar')

export function setLang(l) {
  lang.value = l === 'ar' ? 'ar' : 'en'
}

// Pick the active translation from a { en, ar } object.
export function t(value) {
  return value[lang.value]
}

// Keep <html lang/dir> in sync: the CSS keys off these attributes.
watchEffect(() => {
  const root = document.documentElement
  root.lang = lang.value
  root.dir = lang.value === 'ar' ? 'rtl' : 'ltr'
  try {
    localStorage.setItem('lang', lang.value)
  } catch {
    /* storage can be blocked; the toggle still works for this visit */
  }
})
