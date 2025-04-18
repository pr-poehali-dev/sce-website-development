
import Layout from '@/components/layout/Layout';
import { Separator } from '@/components/ui/separator';
import { Shield, FileText, User, Building, Microscope } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <div className="bg-sce-primary text-white py-12">
        <div className="sce-container">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">О Фонде SCE</h1>
          <p className="text-xl">Secure. Control. Explore.</p>
        </div>
      </div>

      <div className="sce-container py-8">
        <div className="max-w-4xl mx-auto">
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Shield className="h-6 w-6 text-sce-primary" />
              Миссия Фонда
            </h2>
            <p className="mb-4 text-lg">
              Фонд SCE (Secure, Control, Explore) — засекреченная организация, 
              основанная с целью обеспечения безопасности человечества путем 
              обнаружения, содержания и исследования аномальных объектов и явлений.
            </p>
            <p className="mb-4">
              Наша основная задача — защита человечества от угроз аномального 
              происхождения. Это достигается путем строгой изоляции потенциально 
              опасных объектов, их тщательного изучения и разработки методов 
              нейтрализации их негативного воздействия.
            </p>
            <p>
              Девиз нашей организации отражает три основных направления нашей деятельности:
            </p>
            <ul className="list-disc pl-8 mt-4 space-y-2">
              <li>
                <strong>Secure (Обеспечение безопасности)</strong> — изоляция 
                аномальных объектов для защиты гражданского населения.
              </li>
              <li>
                <strong>Control (Контроль)</strong> — мониторинг и управление 
                аномальными явлениями для предотвращения их негативного воздействия.
              </li>
              <li>
                <strong>Explore (Исследование)</strong> — научное изучение аномалий 
                для понимания их природы и разработки методов их контроля или нейтрализации.
              </li>
            </ul>
          </section>

          <Separator className="my-8" />

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FileText className="h-6 w-6 text-sce-primary" />
              История организации
            </h2>
            <p className="mb-4">
              Фонд SCE был основан в середине XX века группой ученых и военных 
              специалистов, столкнувшихся с необъяснимыми явлениями во время 
              исследовательских экспедиций. Официально организация не существует 
              и финансируется тайно.
            </p>
            <p className="mb-4">
              За десятилетия работы Фонду удалось обнаружить и изолировать сотни 
              аномальных объектов, предотвратив множество потенциальных катастроф 
              глобального масштаба. Благодаря строгой секретности, широкая 
              общественность не знает о существовании этих угроз и о работе, 
              которую Фонд SCE выполняет для защиты человечества.
            </p>
          </section>

          <Separator className="my-8" />

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <User className="h-6 w-6 text-sce-primary" />
              Персонал
            </h2>
            <p className="mb-4">
              Фонд SCE имеет иерархическую структуру с четко определенными уровнями доступа:
            </p>
            <ul className="list-disc pl-8 space-y-3">
              <li>
                <strong>Руководство (O5)</strong> — высший орган управления, принимающий 
                стратегические решения. Их личности строго засекречены.
              </li>
              <li>
                <strong>Администраторы</strong> — управляющий персонал, координирующий 
                работу различных подразделений.
              </li>
              <li>
                <strong>Исследователи</strong> — научные специалисты, изучающие 
                аномальные объекты и разрабатывающие методы их содержания.
              </li>
              <li>
                <strong>Оперативники</strong> — полевой персонал, занимающийся 
                обнаружением и захватом аномалий.
              </li>
              <li>
                <strong>Обслуживающий персонал</strong> — персонал, обеспечивающий 
                базовые функции объектов Фонда.
              </li>
            </ul>
          </section>

          <Separator className="my-8" />

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Building className="h-6 w-6 text-sce-primary" />
              Объекты и Зоны
            </h2>
            <p className="mb-4">
              Фонд SCE управляет сетью секретных объектов по всему миру, включая:
            </p>
            <ul className="list-disc pl-8 space-y-3">
              <li>
                <strong>Зоны содержания</strong> — специализированные комплексы для 
                изоляции аномальных объектов. Варьируются от небольших камер до 
                масштабных сооружений.
              </li>
              <li>
                <strong>Исследовательские центры</strong> — лаборатории для изучения 
                свойств аномалий.
              </li>
              <li>
                <strong>Зоны управления</strong> — административные центры для 
                координации деятельности Фонда.
              </li>
              <li>
                <strong>Логистические базы</strong> — центры для распределения 
                ресурсов и хранения неаномальных материалов.
              </li>
            </ul>
          </section>

          <Separator className="my-8" />

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Microscope className="h-6 w-6 text-sce-primary" />
              Классификация объектов
            </h2>
            <p className="mb-4">
              Аномальные объекты, находящиеся под контролем Фонда SCE, классифицируются 
              по нескольким параметрам:
            </p>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Класс содержания:</h3>
                <ul className="list-disc pl-8 space-y-1">
                  <li>
                    <strong>Safe (Безопасный)</strong> — объекты, которые могут быть 
                    надежно содержаны с минимальными ресурсами.
                  </li>
                  <li>
                    <strong>Euclid (Евклид)</strong> — объекты, требующие более 
                    сложных процедур содержания и постоянного мониторинга.
                  </li>
                  <li>
                    <strong>Keter (Кетер)</strong> — объекты, трудные для содержания 
                    или представляющие серьезную угрозу.
                  </li>
                  <li>
                    <strong>Thaumiel (Таумиэль)</strong> — объекты, используемые 
                    Фондом для содержания или нейтрализации других аномалий.
                  </li>
                  <li>
                    <strong>Apollyon (Аполлион)</strong> — объекты, которые невозможно 
                    содержать и которые представляют экзистенциальную угрозу.
                  </li>
                  <li>
                    <strong>Neutralized (Нейтрализованный)</strong> — объекты, 
                    утратившие свои аномальные свойства.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Класс риска:</h3>
                <ul className="list-disc pl-8 space-y-1">
                  <li>
                    <strong>Notice (Уведомление)</strong> — минимальный риск.
                  </li>
                  <li>
                    <strong>Caution (Осторожность)</strong> — низкий риск.
                  </li>
                  <li>
                    <strong>Warning (Предупреждение)</strong> — средний риск.
                  </li>
                  <li>
                    <strong>Danger (Опасность)</strong> — высокий риск.
                  </li>
                  <li>
                    <strong>Critical (Критический)</strong> — экстремальный риск.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Уровень допуска:</h3>
                <p className="mb-2">
                  Доступ к информации об объектах ограничен в зависимости от уровня допуска персонала:
                </p>
                <ul className="list-disc pl-8 space-y-1">
                  <li>
                    <strong>Уровень 1</strong> — базовая информация, доступная большинству сотрудников.
                  </li>
                  <li>
                    <strong>Уровень 2</strong> — более детальная информация для специалистов.
                  </li>
                  <li>
                    <strong>Уровень 3</strong> — полная информация для руководителей проектов.
                  </li>
                  <li>
                    <strong>Уровень 4</strong> — стратегическая информация для высшего руководства.
                  </li>
                  <li>
                    <strong>Уровень 5</strong> — сверхсекретная информация, доступная только O5.
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default About;
