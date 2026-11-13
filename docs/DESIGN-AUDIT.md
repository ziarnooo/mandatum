# V3 — audit spójności i proponowany styleguide

13 listopada 2026. Audyt projektowy, bez zmiany implementacji. Status: **propozycja do oceny w preview**, nie zatwierdzony redesign.

## Wdrożenie — 13 listopada 2026

W lokalnym V3 wdrożono pierwszy spójny pass: uporządkowane style ciphera i spokojniejsza fala 1–2 liter; wspólne CTA14px/44px; matowa karta profilu; istniejące zdjęcie uścisku dłoni zamiast malarstwa; kompaktowe testimonials; czytelne Donate mobile; FAQ dla Fellow na początku; przyciski partnerów z szerokością treści; wspólna paleta, etykiety i font body bez globalnego `!important`. Pełna konsolidacja wszystkich historycznych reguł CSS pozostaje kolejnym krokiem — nie deklarujemy jej ukończenia.

## Status po ocenie użytkownika

Użytkownik odrzucił ogólny styl po pierwszym wdrożeniu audytu. Poniższy styleguide jest historyczną propozycją, nie obowiązującym kierunkiem. Aktualny brief: REVIEW.md → Design direction reset. Zachować wskazane interakcje, ustalić nowy język wizualny na konkretnej referencji Damiana Fejdasza.

## Wniosek

Strona ma dobrą bazę: kremowe tło, granat, szeryfowe nagłówki, cienki grid i lekką typografię. Niespójność powstaje przez dokładanie kolejnych efektów oraz nadpisywanie wcześniejszych reguł. Największy zysk da ograniczenie liczby wariantów i uporządkowanie komponentów, nie kolejna animacja.

Rekomendowany kierunek: **współczesna, redakcyjna strona fundacji; precyzja wojskowa w detalach, ludzie i kariera w treści.** Moro i transformacja garderoby są akcentem opowieści, nie dekoracją każdej sekcji.

## Zakres i dowody

Przejrzano strukturę/DOM wszystkich siedmiu stron V3 oraz `public/review/v3.css`, `public/review/v3.js`, `scripts/build-review.mjs`, `scripts/v3-refinements.mjs`, `src/styles/original.css`, `docs/MIGRATION.md` i `docs/REVIEW.md`. W przeglądarce oceniono desktopowe widoki Home, Contact, FAQ, Testimonials i kafli Values. Partnerships sprawdzono także w stanie wejścia. Donate oraz pozostałe części About oceniono przez strukturę i CSS; pełny wizualny przegląd mobilny pozostaje do wykonania. To nie jest nowy audyt Lighthouse ani pełny test wszystkich interakcji.

## Ustalenia użytkownika — zachować

- Oryginalny znak Mandatum i granat; nagłówki szeryfowe, treść/menu lekkie sans-serif, mono dla etykiet. Neon z logo tylko jako oszczędny akcent.
- Primary granatowy, secondary z obrysem; bez strzałek, zaokrągleń, cienia i zmiany rozmiaru. Rolling text na hover/focus.
- Hero: tylko „experience” / „next step” zmienia się; szare, kursywą, bez kafelków/tła. „Your” statyczne; „matters.” zawsze w drugim wierszu. Brak skoku odstępów.
- Przemiany zawsze wojskowe → cywilne/biznesowe.
- Animowane wejścia z blur oraz reduced-motion. Dalsze uproszczenia czasu/ruchu poniżej są propozycjami, nie zgodą na usunięcie zamówionych efektów.

## Priorytety

**P0 — przed kolejną rundą designu**

1. **Jeden obowiązujący opis.** `REVIEW.md` miesza historyczne i aktualne decyzje: zaokrąglanie przycisków, niebieskie/monochromatyczne portrety, tabs Values, dawne hero i galerie. Na górze ma być aktualny stan; historia oznaczona jako zastąpiona. Bez tego kolejny agent odtwarza odrzucone pomysły. Parent agent porządkuje to wraz z handoffem.
2. **Jedna reguła na komponent.** `v3.css` zawiera kolejne, sprzeczne definicje `.button`, `.hero-flap`, `.full-quote` i `.brand-relief`. Globalny selektor elementów z `!important` wymusza fonty nawet w małych kartach profilu. Skonsolidować finalne wartości w tokeny i sekcje komponentów, zachowując aktualny wygląd; najpierw screenshot baseline wszystkich stron. Nie dopisywać kolejnego „final override”.
3. **Nie oceniać tylko pojedynczego screena.** Sprawdzać stany: spoczynek, hover/focus, połowa animacji, koniec, mobile. Błędy odstępów cipher i rozszerzania testimonials ujawniały się dopiero pomiędzy stanami.

**P1 — poprawki wizualne i produktowe**

| Strona | Obserwacja | Następny krok |
| --- | --- | --- |
| Home | Hero z realistycznym moro, ilustracja malarska w kolejnej sekcji i fotograficzna garderoba to trzy języki obrazów. | Wybrać fotografię jako domyślny język; malarstwo zostawić tylko jako wariant w kontrolerze. Nie zmieniać autentycznych zdjęć ludzi na AI. |
| Home | Duży panel hero ma miękką ramę i dużo pustego miejsca, podczas gdy reszta używa ostrych cienkich ramek. | Ograniczyć szklistą ramę/cień; dopasować panel do tej samej grubości linii. Zachować miejsce zarezerwowane na kolejne etapy, aby nie skakał. |
| Home | Czapka, kołnierz i but dobrze pokazują zmianę, ale same nie tłumaczą immersion/coaching/networking. | Zachować duże kadry i opisy trzech usług; nie przedstawiać garderoby jako dosłownego efektu usługi. Testować czy metafora pomaga, zamiast dokładać schematy na zdjęcia. |
| About | Długa strona łączy opis znaku, mission, film, vision, values, events i trzy grupy leadership. | Ujednolicić rytm 96/64 px i hierarchię nagłówków. Plain Values; naturalne portrety. Nie dodawać dekoracji pomiędzy każdą sekcją. |
| Partnerships | Layout logo → opis jest spójny, ale przyciski rozciągają się na szerokość kolumny, inaczej niż na Home. | Jeden rozmiar przycisku; szerokość z treści poza jasno oznaczonym pełnym przyciskiem formularza. Zachować loader i działanie klawiaturą. |
| Testimonials | Wielka karta z abstrakcyjnymi liniami ma około 220 px górnego paddingu, mimo braku zdjęcia; układ udaje kartę fotograficzną. | Zachować szeroki slider i pełny cytat, lecz zmniejszyć pustą górę, gdy brak zdjęcia. Autentyczne zdjęcia dodać tylko po otrzymaniu; bez fikcyjnych autorów. |
| FAQ | Układ dwóch kolumn jest czytelny. „Explore Fellowship” prowadzi jednak od razu do pytań o hosting firm. | Zacząć od pytania dla Fellow albo wybranego tematu, bez powrotu dużego hero. Ujednolicić rozmiar etykiet i filtrów. |
| Contact | Dobra, prosta kompozycja; panel ma inny odcień niż inne karty, kilka drobnych stopni tekstu. | Wspólny surface i typografia formularza. Zachować uczciwy komunikat o nieaktywnym wysyłaniu. |
| Donate | Mobilny CSS zmniejsza treść do 11 px, CTA do 10 px, aby zmieścić cztery opcje w dwóch kolumnach. | Priorytet czytelność: jedna kolumna na wąskim ekranie, tekst minimum 14 px. „Wszystko nad foldem” nie może wymuszać miniaturyzacji. |

## Styleguide v0.1 — propozycja do wdrożenia w małym preview

| Obszar | Reguła |
| --- | --- |
| Paleta | Paper `#f8f8f4`, ink `#14344a`, brand `#003462`, muted `#526370`, surface `#eef2f5`, line `#c7d2dc`, white `#ffffff`. Inne kolory tylko w fotografiach i prawdziwych logotypach. |
| Display | Georgia 400; desktop H1 60/1.06, H2 44/1.12, H3 28/1.2; mobile 40/32/24. Hero italic jako jedyny zmienny akcent nagłówka. |
| Body | Helvetica Neue → Helvetica → Arial, 300; 18/1.65 duży tekst, 16/1.65 standard, 14/1.5 metadane. Menu 14/1.4, ten sam ciężar co hero. Długi zatwierdzony intro Arial 400 zachować jako istniejący wyjątek. |
| Labels | Courier New 400, 12/1.5, tracking .1em; Neon wyłącznie wybrane krótkie brand labels, nie body i nie CTA. |
| Grid | Max 1240 px, gutter 48 desktop / 24 mobile. 12 kolumn desktop, 4 mobile. Spacing: 8/16/24/32/48/64/96. Sekcja 96 desktop / 64 mobile; bez sumowania przypadkowego paddingu i marginu. |
| Karty | 1 px line, radius 0, brak cienia. Jedno neutralne tło. Dialog-sheet może zachować 16–18 px na górnych rogach jako wyjątek wynikający z zachowania. |
| Buttons | Wysokość 44 minimum, padding-inline 20, label 14, radius 0. Stała geometria we wszystkich stanach. Primary/secondary + jawny disabled. Wspólny focus ring. |
| Fotografia | Naturalny kolor, spójne kadry i światło. Subtelny gradient tylko pod tekstem na zdjęciu. Bez globalnego tintu, malarstwa i dekoracyjnych ogromnych znaków. |
| Motion | Jedna krzywa `cubic-bezier(.22,1,.36,1)`. UI 180–240 ms; wejścia 480–680 ms raz; świadomie wolniejszy cipher zgodnie z ustaleniem. Nie więcej niż jeden autonomiczny efekt dominujący w danym obszarze. Scroll morph zatrzymuje się wraz ze scrollem; offscreen/hidden pauza. |

Nie wymaga nowych fontów, biblioteki React ani płatnego silnika animacji. Najpierw pokazać zestaw: hero, trzy pillars, Values, portrait + sheet, CTA i formularz w jednym lokalnym preview. Dopiero po ocenie stosować konsekwentnie do siedmiu stron.

## Referencja jakości ruchu — Motion

[Motion homepage](https://motion.dev/) sprawdzono wizualnie 13 listopada 2026: złota sfera składa się z drobnych punktów na spokojnym tle; jest jednym dominującym obiektem, z dużą ilością miejsca wokół. Wniosek projektowy dla Mandatum: ciągła przemiana tej samej struktury, subtelna głębia i spokojne tempo, nie dodawanie nowych wojskowych gadżetów. Złoto, czerń i sama kula nie są nowymi tokenami Mandatum. Dokładna płynność/fps referencji nie była mierzona.

Kryterium hero: zielone plamy → te same plamy w niebieskiej palecie → zlanie plam w czysty granatowy gradient (zero moro na końcu) → stopniowe powstanie technicznej struktury. Bez widocznej linii wipe, nagłej zamiany całej sceny i przycięcia tekstu karty. Wynik ma kojarzyć się z jakością biznes/tech, z zachowaniem historii wojskowej jako punktu startu.

## Jak prowadzić LLM

1. Jeden agent odpowiada za art direction i akceptuje zmiany tokenów. Agenci wykonawczy mogą zmieniać tylko przypisane komponenty.
2. Prompt zawsze wskazuje aktualny styleguide, zatwierdzone screeny, konkretny zakres oraz kryteria „gotowe”. „Nowocześnie” samo w sobie nie jest kryterium.
3. Osobny reviewer porównuje wynik z regułami i briefem. Ma zgłaszać rozbieżności, nie wymyślać kolejnego stylu.
4. Każda uwaga użytkownika trafia do krótkiej listy: aktualne / zastąpione / otwarte. Nowa uwaga o jednym komponencie nie resetuje całej strony.

Przykład promptu implementacyjnego:

> Przeczytaj docs/HANDOFF.md i zatwierdzoną część docs/DESIGN-AUDIT.md. Zmień wyłącznie [komponent]. Użyj istniejących tokenów i fontów. Zachowaj treść, grid i interakcje z briefu. Nie dodawaj nowych efektów, kolorów, radiusów ani fontów. Pokaż desktop i mobile oraz hover/focus i stan reduced-motion. Sprawdź brak przesunięcia layoutu. Podaj konkretne odstępstwa i przyczynę; nie deklaruj zgodności na podstawie samego builda.
