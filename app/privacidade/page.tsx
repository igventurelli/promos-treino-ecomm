import Link from "next/link";

import PromoBrand from "@/components/promos/promo-brand";
import PromoFooter from "@/components/promos/promo-footer";

export const metadata = {
  title: "Privacidade | Promos Treino",
  description: "Politica de privacidade do Promos Treino.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="border-b border-gray-200 bg-white/90 backdrop-blur dark:border-gray-700/60 dark:bg-gray-900/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <PromoBrand />
          <Link href="/" className="btn rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 dark:border-gray-700/60 dark:bg-gray-800 dark:text-gray-200">
            &lt;- Voltar
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-xs dark:border-gray-700/60 dark:bg-gray-800">
          <h1 className="text-2xl font-black text-gray-900 dark:text-gray-100">Politica de privacidade</h1>
          <p className="mt-4 text-sm leading-6 font-medium text-gray-600 dark:text-gray-300">
            O Promos Treino e uma vitrine independente de promocoes fitness. Nao vendemos produtos diretamente; ao clicar em uma promocao, voce pode ser redirecionado para marketplaces ou lojas parceiras, que possuem suas proprias politicas de privacidade, preco, estoque e entrega.
          </p>

          <h2 className="mt-6 text-lg font-black text-gray-900 dark:text-gray-100">Dados, cookies e publicidade</h2>
          <p className="mt-2 text-sm leading-6 font-medium text-gray-600 dark:text-gray-300">
            Usamos produtos do Google, como Google Analytics e Google AdSense, para medir audiencia, entender interacoes no site e exibir anuncios. Como consequencia, o Google e outros terceiros podem usar cookies, web beacons, enderecos IP ou identificadores semelhantes para coletar, compartilhar e usar dados relacionados a visitas, paginas acessadas, cliques e interacoes com anuncios.
          </p>
          <p className="mt-2 text-sm leading-6 font-medium text-gray-600 dark:text-gray-300">
            Analytics e anuncios sao carregados apenas apos o aceite no aviso de cookies. Voce pode reabrir a escolha pelo link "Cookies" no rodape.
          </p>
          <p className="mt-2 text-sm leading-6 font-medium text-gray-600 dark:text-gray-300">
            Saiba mais em{" "}
            <a href="https://policies.google.com/technologies/partner-sites" className="font-bold text-green-700 hover:text-green-800 dark:text-green-300 dark:hover:text-green-200" rel="nofollow">
              Como o Google usa dados quando voce usa sites ou apps dos nossos parceiros
            </a>
            .
          </p>

          <h2 className="mt-6 text-lg font-black text-gray-900 dark:text-gray-100">Links de promocao</h2>
          <p className="mt-2 text-sm leading-6 font-medium text-gray-600 dark:text-gray-300">
            Links externos podem conter identificadores de afiliacao, rastreamento ou campanha. Isso pode gerar comissao para o Promos Treino, sem custo adicional para voce.
          </p>

          <h2 className="mt-6 text-lg font-black text-gray-900 dark:text-gray-100">Informacoes pessoais</h2>
          <p className="mt-2 text-sm leading-6 font-medium text-gray-600 dark:text-gray-300">
            A vitrine nao solicita cadastro, senha, documentos ou dados de pagamento. Qualquer compra, pagamento ou atendimento acontece no marketplace ou loja de destino.
          </p>

          <h2 className="mt-6 text-lg font-black text-gray-900 dark:text-gray-100">Atualizacoes</h2>
          <p className="mt-2 text-sm leading-6 font-medium text-gray-600 dark:text-gray-300">
            Esta politica pode ser atualizada para refletir mudancas na operacao, em parceiros de publicidade ou em exigencias legais.
          </p>
        </article>
      </section>

      <PromoFooter />
    </main>
  );
}
