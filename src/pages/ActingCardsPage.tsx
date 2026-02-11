import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SchemaMarkup from "@/components/SchemaMarkup";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PhoneForm from "@/components/PhoneForm";
import { api, SiteContent } from "@/lib/api";

export default function ActingCardsPage() {
  const [content, setContent] = useState<Record<string, string>>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const contentData = await api.content.getAll();
      const contentMap: Record<string, string> = {};
      contentData.forEach((item: SiteContent) => {
        contentMap[item.key] = item.value;
      });
      setContent(contentMap);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const problems = [
    {
      icon: "Video",
      title: "Наигрышем перед камерой",
      description:
        "Боишься камеру, зажимаешься и стесняешься перед ней. Пропадает естественность и появляется наигрыш",
    },
    {
      icon: "MessageSquare",
      title: "Текстом и его произношением",
      description:
        "Затруднения со структурированием и выражением своих мыслей перед камерой",
    },
    {
      icon: "AlertCircle",
      title: "Неубедительностью",
      description:
        "Чувствуешь что недостаточно выразителен, одинаков и неинтересен в кадре",
    },
    {
      icon: "Heart",
      title: "Недостатком эмоций",
      description:
        "Сложности с проявлением эмоций на камеру. Проблемы с передачей нужных эмоций и чувств",
    },
    {
      icon: "Eye",
      title: "Боязнью показать себя",
      description:
        "Выявление необходимого темперамента для проявления личностной составляющей",
    },
  ];

  const formats = [
    {
      title: "Актерская визитка без режиссера",
      price: "5 000 руб.",
      features: [
        "Запись визитки делает оператор",
        "В этой визитке актер представляется и рассказывает о себе",
        "Съемка визитки происходит в 4К разрешении",
        "Обработка. Добавляются именные титры актера, чистится звук и делается цветокоррекция",
      ],
      result:
        "Через 1-2 дня после съемки вы получаете профессиональную, стандартную актерскую видео визитку",
    },
    {
      title: "Визитка история с режиссером",
      price: "7 000 руб.",
      features: [
        "В этой визитке актер рассказывает историю из своей жизни",
        "С актером работает опытный кино режиссер. Он помогает актеру раскрыться и показать свою органику и выразительность, а так же продемонстрировать диапазон актерских проявлений",
        "Режиссер помогает актеру определиться с историей и найти ключевые точки сюжета",
        "Съемка визитки происходит в 4К разрешении",
        "Обработка. Добавляются именные титры актера, чистится звук и делается цветокоррекция",
      ],
      result:
        "Через 1-2 дня после съемки вы получаете профессиональную актерскую, работающую видео визитку",
      highlighted: true,
    },
    {
      title: "2 актерские визитки",
      price: "10 000 руб.",
      features: [
        "Необходимость в двух актерских визиток обусловлена их разностью. Так одна из визиток может быть записана в комедийном ключе, а вторая в драматическом",
        "С актером работает опытный кино режиссер. Он помогает актеру раскрыться и показать свою органику и выразительность, а так же продемонстрировать диапазон актерских проявлений",
        "Наличие двух визиток дает актеру возможность выбрать какую визитку отправить на тот и или иной кастинг. Такой метод дает более высокий шанс получить роль",
        "Обработка. Добавляются именные титры актера, чистится звук и делается цветокоррекция",
      ],
      result:
        "Через 1-2 дня после съемки вы получаете 2 профессиональные актерские, работающие видео визитки",
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          Актерские визитки с режиссером в Москве | Профессиональная съемка для
          актеров
        </title>
        <meta
          name="description"
          content="Профессиональные актерские визитки с опытным режиссером. Съемка в 4К, работа над органикой и выразительностью. Эффективный инструмент для продвижения карьеры актера."
        />
        <link
          rel="canonical"
          href="https://xn----7sbdfnbalzedv3az5aq.xn--p1ai/acting-cards"
        />
        <meta
          property="og:url"
          content="https://xn----7sbdfnbalzedv3az5aq.xn--p1ai/acting-cards"
        />
        <meta
          property="og:title"
          content="Актерские визитки с режиссером в Москве"
        />
        <meta
          property="og:description"
          content="Профессиональные актерские визитки с опытным режиссером. Съемка в 4К, работа над органикой и выразительностью."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://cdn.poehali.dev/projects/d006fe31-f11a-48d3-ba82-54149e58d318/files/b34e4f5d-452d-44bb-bedb-a00378237a0c.jpg"
        />
      </Helmet>
      <SchemaMarkup
        type="breadcrumbs"
        breadcrumbs={[
          {
            name: "Главная",
            url: "https://xn----7sbdfnbalzedv3az5aq.xn--p1ai/",
          },
          {
            name: "Актерские визитки",
            url: "https://xn----7sbdfnbalzedv3az5aq.xn--p1ai/acting-cards",
          },
        ]}
      />
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <Breadcrumbs />

        <section className="pt-20 pb-12 px-4 md:pt-32 md:pb-20">
          <div className="container mx-auto">
            <div className="text-center mb-12 max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Актерские визитки
                <br />
                <span className="text-primary">с режиссером</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Работающие видеовизитки разработаны как для профессиональных,
                так и для начинающих актеров всех возрастов. С каждым актером
                работает опытный режиссер, который помогает раскрыться и
                проявить свои индивидуальные актерские качества. В результате
                актер получает не просто красивое видео, а эффективный
                инструмент для продвижения своей карьеры. Записывайтесь!
              </p>
              <PhoneForm
                source="acting_cards_hero"
                course="acting-cards"
                triggerText="Записаться на съемку"
                triggerSize="lg"
                title="Запись на съемку актерской визитки"
                description="Оставьте номер телефона, и мы свяжемся с вами"
              />
            </div>
          </div>
        </section>

        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Если возникнет проблема с
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {problems.map((problem, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition group border-2"
                >
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition">
                      <Icon
                        name={problem.icon}
                        className="text-primary"
                        size={28}
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{problem.title}</h3>
                    <p className="text-muted-foreground">{problem.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <h3 className="text-2xl md:text-4xl font-bold text-primary">
                ТО я помогу ее решить
              </h3>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center">
                О режиссере
              </h2>
              <div className="bg-card rounded-2xl p-8 md:p-12">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">
                      Казбек Меретуков
                    </h3>
                    <p className="text-primary font-semibold mb-6">
                      Художественный руководитель центра подготовки актеров кино
                    </p>
                    <p className="text-muted-foreground mb-6">
                      Режиссер постановщик на сериальных проектах разных
                      форматов и жанров, которые получили признание на каналах
                      России, Украины, Белоруссии, Израиля.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold mb-2">Образование:</h4>
                        <ul className="text-muted-foreground space-y-1">
                          <li>
                            • ГИТИС. Режиссура драмы. Окончил с отличием.
                          </li>
                          <li>
                            • ВГИК. Высшие режиссерские курсы, повышения
                            квалификации по специальности кинорежиссура.
                          </li>
                          <li>
                            • Курс «Роль режиссера в производстве
                            телесериалов». Кинокомпания АМЕДИА.
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold mb-2">Фильмография:</h4>
                        <ul className="text-muted-foreground space-y-1">
                          <li>• «След»</li>
                          <li>• «Дело врачей»</li>
                          <li>• «До суда»</li>
                          <li>• «Маруся»</li>
                          <li>• «Наши соседи»</li>
                          <li>• «Обручальное кольцо»</li>
                          <li>• «Принцесса цирка»</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold mb-2">Призы и награды:</h4>
                        <p className="text-muted-foreground">
                          Теленовелла «Обручальное кольцо» победитель премии
                          ТЕФИ 2012 в номинации «Телевизионный художественный
                          сериал телероман»
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Форматы актерских визиток
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {formats.map((format, index) => (
                <Card
                  key={index}
                  className={`flex flex-col ${
                    format.highlighted
                      ? "border-4 border-primary shadow-2xl scale-105"
                      : ""
                  }`}
                >
                  <CardContent className="p-8 flex flex-col flex-1">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold mb-3">
                        {format.title}
                      </h3>
                      <div className="text-4xl font-bold text-primary">
                        {format.price}
                      </div>
                    </div>
                    <ul className="space-y-3 mb-6 flex-1">
                      {format.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Icon
                            name="Check"
                            className="text-primary flex-shrink-0 mt-1"
                            size={18}
                          />
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="bg-background p-4 rounded-lg mb-6">
                      <h4 className="font-bold mb-2 text-sm">Результат:</h4>
                      <p className="text-sm text-muted-foreground">
                        {format.result}
                      </p>
                    </div>
                    <PhoneForm
                      source={`acting_cards_${index}`}
                      course="acting-cards"
                      triggerText="Выбрать формат"
                      triggerClassName="w-full"
                      triggerVariant={format.highlighted ? "default" : "outline"}
                      title={`Запись на ${format.title}`}
                      description="Оставьте номер телефона, и мы свяжемся с вами"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Готовы записать свою визитку?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Запишитесь на съемку актерской визитки и получите
                профессиональный инструмент для продвижения своей карьеры
              </p>
              <PhoneForm
                source="acting_cards_cta"
                course="acting-cards"
                triggerText="Записаться на съемку"
                triggerSize="lg"
                title="Запись на съемку актерской визитки"
                description="Оставьте номер телефона, и мы свяжемся с вами"
              />
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
