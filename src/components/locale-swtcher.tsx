// Locale switcher refs:
// - Paraglide docs: https://inlang.com/m/gerre34r/library-inlang-paraglideJs
// - Router example: https://github.com/TanStack/router/tree/main/examples/react/i18n-paraglide#switching-locale

import { Button } from "@/components/ui/button";
import { m } from "@/paraglide/messages";
import { getLocale, locales, setLocale } from "@/paraglide/runtime";

export default function ParaglideLocaleSwitcher() {
	const currentLocale = getLocale();

	return (
		<fieldset className="flex items-center gap-2 border-none p-0 m-0">
			<legend className="sr-only">{m.language_label()}</legend>
			<span className="opacity-85 text-sm">
				{m.current_locale({ locale: currentLocale })}
			</span>
			<div className="flex gap-1">
				{locales.map((locale) => (
					<Button
						key={locale}
						variant={locale === currentLocale ? "default" : "outline"}
						size="sm"
						onClick={() => setLocale(locale)}
						aria-pressed={locale === currentLocale}
					>
						{locale.toUpperCase()}
					</Button>
				))}
			</div>
		</fieldset>
	);
}
