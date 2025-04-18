
import Layout from '@/components/layout/Layout';
import { Separator } from '@/components/ui/separator';
import { Lock, Shield, FileText } from 'lucide-react';

const Privacy = () => {
  return (
    <Layout>
      <div className="bg-sce-primary text-white py-12">
        <div className="sce-container">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Политика конфиденциальности</h1>
          <p className="text-xl">Информация о сборе и обработке данных на сайте Фонда SCE</p>
        </div>
      </div>

      <div className="sce-container py-8">
        <div className="max-w-4xl mx-auto">
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Shield className="h-6 w-6 text-sce-primary" />
              Общие положения
            </h2>
            <p className="mb-4">
              Настоящая Политика конфиденциальности определяет порядок обработки и защиты информации о пользователях сайта Фонда SCE. Используя сайт, вы соглашаетесь с условиями данной Политики.
            </p>
            <p>
              Администрация сайта гарантирует конфиденциальность получаемой информации и использование её исключительно в целях, описанных в данном документе.
            </p>
          </section>

          <Separator className="my-8" />

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FileText className="h-6 w-6 text-sce-primary" />
              Сбор и использование информации
            </h2>
            <p className="mb-4">
              При регистрации на сайте Фонда SCE пользователь предоставляет следующую информацию:
            </p>
            <ul className="list-disc pl-8 mb-4 space-y-2">
              <li>Адрес электронной почты</li>
              <li>Имя пользователя</li>
              <li>Пароль для доступа к учетной записи</li>
            </ul>
            
            <p className="mb-4">
              Также при использовании сайта автоматически собираются:
            </p>
            <ul className="list-disc pl-8 mb-4 space-y-2">
              <li>IP-адрес;</li>
              <li>Информация из cookies;</li>
              <li>Информация о браузере;</li>
              <li>Время доступа;</li>
              <li>Данные о действиях пользователя на сайте.</li>
            </ul>
            
            <p>
              Собранная информация используется для:
            </p>
            <ul className="list-disc pl-8 mt-4 space-y-2">
              <li>Идентификации пользователя при доступе к сайту;</li>
              <li>Предоставления персонализированного доступа к материалам;</li>
              <li>Анализа использования сайта и его улучшения;</li>
              <li>Обеспечения безопасности и выявления нарушений.</li>
            </ul>
          </section>

          <Separator className="my-8" />

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Lock className="h-6 w-6 text-sce-primary" />
              Защита информации
            </h2>
            <p className="mb-4">
              Администрация сайта принимает все необходимые меры для защиты персональных данных пользователей от неправомерного доступа, изменения, раскрытия или уничтожения.
            </p>
            <p className="mb-4">
              К мерам по защите информации относятся:
            </p>
            <ul className="list-disc pl-8 space-y-2">
              <li>Шифрование данных при передаче;</li>
              <li>Хранение паролей в зашифрованном виде;</li>
              <li>Ограничение доступа к персональным данным;</li>
              <li>Регулярное обновление систем безопасности;</li>
              <li>Мониторинг и выявление подозрительной активности.</li>
            </ul>
          </section>

          <Separator className="my-8" />

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Предоставление данных третьим лицам</h2>
            <p className="mb-4">
              Администрация сайта не передает персональные данные пользователей третьим лицам, за исключением случаев, предусмотренных законодательством.
            </p>
            <p>
              Обезличенные данные могут использоваться для статистического анализа и улучшения работы сайта.
            </p>
          </section>

          <Separator className="my-8" />

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Изменение и удаление информации</h2>
            <p className="mb-4">
              Пользователь вправе в любой момент изменить (обновить, дополнить) предоставленную информацию в своем личном профиле.
            </p>
            <p>
              Пользователь также может запросить удаление своей учетной записи и связанных с ней данных, направив соответствующий запрос на адрес: privacy@sce-foundation.net.
            </p>
          </section>

          <Separator className="my-8" />

          <section>
            <h2 className="text-2xl font-bold mb-4">Заключительные положения</h2>
            <p className="mb-4">
              Администрация сайта имеет право вносить изменения в настоящую Политику конфиденциальности. Новая редакция Политики вступает в силу с момента ее размещения на сайте.
            </p>
            <p className="mb-4">
              Все предложения или вопросы по настоящей Политике конфиденциальности следует сообщать в службу поддержки Фонда SCE по адресу: privacy@sce-foundation.net.
            </p>
            <p className="font-semibold">
              Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
