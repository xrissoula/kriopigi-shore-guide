import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { useT } from "@/i18n";
import { speciesSlug } from "@/lib/species";
import posidonia from "@/assets/posidonia.jpg";

import pineForestShore from "@/assets/pine-forest-shore.jpeg";
import maquisShrubland from "@/assets/maquis-shrubland.jpeg";
import phryganaTortoise from "@/assets/phrygana-tortoise.jpeg";
import eupholidoptera from "@/assets/eupholidoptera-smyrnensis.jpg.asset.json";

export const Route = createFileRoute("/flora-fauna")({
  head: () => ({
    meta: [
      { title: "Flora & Fauna — Kriopigi Shore Guide" },
      { name: "description", content: "A field catalogue of Kriopigi's species, zone by zone — from the pine-shaded dune to the deep-water meadows." },
      { property: "og:title", content: "Flora & Fauna — Kriopigi Shore Guide" },
      { property: "og:description", content: "From the pine line to the open sea: five ecological zones of the Kriopigi shore." },
    ],
  }),
  component: FloraFauna,
});

type Species = { sci: string; common: string; note: string; status: "confirmed" | "expected"; expectedContext?: "suitable habitat" | "offshore" | "deeper habitat"; img?: string; wiki?: string };
type Zone = { id: string; eyebrow: string; title: string; depth: string; lead: string; species: Species[] };

const W = "https://en.wikipedia.org/wiki/";

const zones: Zone[] = [
  {
    id: "dune",
    eyebrow: "Zone 1",
    title: "Dune & Pine Edge",
    depth: "Above the high tide line",
    lead: "The terrestrial fringe — sand-binding plants and the Aleppo pine canopy that shades the shore.",
    species: [
      { sci: "Pinus halepensis", common: "Aleppo pine", note: "Dominant canopy tree; its resin perfumes the shoreline on hot summer afternoons.", status: "expected", wiki: W + "Pinus_halepensis", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/%CE%A7%CE%B1%CE%BB%CE%AD%CF%80%CE%B9%CE%BF%CF%82_%CF%80%CE%B5%CF%8D%CE%BA%CE%B7_%CE%A3%CE%BF%CF%8D%CE%BD%CE%B9%CE%BF_1963.jpg/330px-%CE%A7%CE%B1%CE%BB%CE%AD%CF%80%CE%B9%CE%BF%CF%82_%CF%80%CE%B5%CF%8D%CE%BA%CE%B7_%CE%A3%CE%BF%CF%8D%CE%BD%CE%B9%CE%BF_1963.jpg" },
      { sci: "Eryngium maritimum", common: "Sea holly", note: "Spiny blue-grey leaves anchor the upper dunes and bloom with metallic-blue flowers in summer.", status: "expected", wiki: W + "Eryngium_maritimum", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Eryngium_maritimum_-_geograph.org.uk_-_496275.jpg/330px-Eryngium_maritimum_-_geograph.org.uk_-_496275.jpg" },
      { sci: "Cakile maritima", common: "Sea rocket", note: "Fast-growing pioneer of the strand line; pale lilac flowers appear above the sand in spring and summer.", status: "expected", wiki: W + "Cakile_maritima", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Cakile_maritima_Rad%C3%A8s_beach.jpg/330px-Cakile_maritima_Rad%C3%A8s_beach.jpg" },
      { sci: "Larus michahellis", common: "Yellow-legged gull", note: "Large coastal gull that patrols beaches and cliffs, calling loudly throughout the day.", status: "expected", wiki: W + "Yellow-legged_gull", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Yellow-legged_Gull_2023-10-10.jpg/330px-Yellow-legged_Gull_2023-10-10.jpg" },
      { sci: "Testudo hermanni boettgeri", common: "Boettger's tortoise", note: "Slow-moving tortoise of dry scrub and open woodland, often active during the cooler parts of the day.", status: "confirmed", wiki: W + "Hermann%27s_tortoise" , img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Testudo_hermanni_Boettgeri_-_01.jpg/330px-Testudo_hermanni_Boettgeri_-_01.jpg" },
      { sci: "Mediodactylus kotschyi", common: "Kotschy's gecko", note: "Small, well-camouflaged gecko that shelters in rocks, crevices and stonework during the day.", status: "confirmed", wiki: W + "Mediodactylus_kotschyi" , img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Cyrtopodion_kotschyi.JPG/330px-Cyrtopodion_kotschyi.JPG" },
      { sci: "Hemidactylus turcicus", common: "Mediterranean house gecko", note: "Nocturnal gecko often seen hunting insects on walls and around lights after sunset.", status: "confirmed", wiki: W + "Mediterranean_house_gecko" , img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Konstantinos_Kalaentzis_-_Hemidactylus_turcicus_%28A7%29.jpg/330px-Konstantinos_Kalaentzis_-_Hemidactylus_turcicus_%28A7%29.jpg" },
      { sci: "Phylloscopus trochilus", common: "Willow warbler", note: "Small migratory warbler that moves restlessly through foliage while searching for insects.", status: "confirmed", wiki: W + "Willow_warbler" , img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Willow_Warbler_Phylloscopus_trochilus.jpg/330px-Willow_Warbler_Phylloscopus_trochilus.jpg" },
      { sci: "Curruca curruca", common: "Lesser whitethroat", note: "Secretive migratory warbler of shrubs and woodland edges, usually noticed first by its call.", status: "confirmed", wiki: W + "Lesser_whitethroat" , img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/%D0%A1%D0%BB%D0%B0%D0%B2%D0%BA%D0%B0-%D0%B7%D0%B0%D0%B2%D0%B8%D1%80%D1%83%D1%88%D0%BA%D0%B0_%28Sylvia_curruca%29.jpg/330px-%D0%A1%D0%BB%D0%B0%D0%B2%D0%BA%D0%B0-%D0%B7%D0%B0%D0%B2%D0%B8%D1%80%D1%83%D1%88%D0%BA%D0%B0_%28Sylvia_curruca%29.jpg" },
      { sci: "Corvus cornix", common: "Hooded crow", note: "Highly adaptable grey-and-black crow seen foraging from pine forest to shoreline.", status: "confirmed", wiki: W + "Hooded_crow" , img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Hooded_Crow_%28Corvus_cornix%29_City_Park%2C_Skopje%2C_North_Macedonia.jpg/330px-Hooded_Crow_%28Corvus_cornix%29_City_Park%2C_Skopje%2C_North_Macedonia.jpg" },
      { sci: "Streptopelia decaocto", common: "Eurasian collared dove", note: "Familiar pale dove of villages and woodland edges, recognized by its narrow black neck collar.", status: "confirmed", wiki: W + "Eurasian_collared_dove" , img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/2022-04-06_Streptopelia_decaocto%2C_Plovdiv%2C_Bulgaria_1.jpg/330px-2022-04-06_Streptopelia_decaocto%2C_Plovdiv%2C_Bulgaria_1.jpg" },
      { sci: "Apis mellifera", common: "Western honey bee", note: "Common flower visitor carrying pollen between wildflowers throughout the warmer months.", status: "confirmed", wiki: W + "Western_honey_bee" , img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Apis_mellifera_Western_honey_bee.jpg/330px-Apis_mellifera_Western_honey_bee.jpg" },
      { sci: "Episyrphus balteatus", common: "Marmalade hover fly", note: "Small orange-banded hover fly that hovers over flowers while feeding on nectar and pollen.", status: "confirmed", wiki: W + "Episyrphus_balteatus" , img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Marmalade_hoverfly_%28Episyrphus_balteatus%29_male_Wengen_2.jpg/330px-Marmalade_hoverfly_%28Episyrphus_balteatus%29_male_Wengen_2.jpg" },
      { sci: "Malva sylvestris", common: "Common mallow", note: "Purple-flowered Mediterranean herb of sunny disturbed ground, pathsides and open scrub.", status: "confirmed", wiki: W + "Malva_sylvestris" , img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Mallow_January_2008-1.jpg/330px-Mallow_January_2008-1.jpg" },
      { sci: "Convolvulus arvensis", common: "Field bindweed", note: "Low twining plant with pale funnel-shaped flowers, common in open and disturbed ground.", status: "confirmed", wiki: W + "Convolvulus_arvensis" , img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Convolvulus_arvensis_in_Aveyron_%282%29.jpg/330px-Convolvulus_arvensis_in_Aveyron_%282%29.jpg" },
      { sci: "Cichorium pumilum", common: "Wild endive", note: "Low Mediterranean chicory with blue flowers that open across sunny dry ground.", status: "confirmed", wiki: W + "Cichorium" , img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Cichorium_pumilum.jpg/330px-Cichorium_pumilum.jpg" },
      { sci: "Decticus albifrons", common: "White-faced bush-cricket", note: "Large Mediterranean bush-cricket of dry grass and scrub, often heard before it is seen.", status: "confirmed", wiki: W + "Decticus" , img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Decticus_albifrons_Porto_Covo_July_2016-1.jpg/330px-Decticus_albifrons_Porto_Covo_July_2016-1.jpg" },
      { sci: "Eupholidoptera smyrnensis", common: "Smyrnean bush-cricket", note: "Robust bush-cricket of warm Mediterranean scrub, active among low vegetation in summer.", status: "confirmed", wiki: W + "Eupholidoptera" , img: eupholidoptera.url },
    ],
  },
  {
    id: "shore",
    eyebrow: "Zone 2",
    title: "Beach & Wash Zone",
    depth: "0 – 0.5 m",
    lead: "The wet sand and breaking surf — turnover habitat for crabs, isopods, and shorebirds.",
    species: [
      { sci: "Ocypode cursor", common: "Tufted ghost crab", note: "Fast, pale crab that vanishes into deep burrows above the surf line.", status: "expected", wiki: W + "Ocypode_cursor", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Ocypode_cursor_1.jpg/330px-Ocypode_cursor_1.jpg" },
      { sci: "Tylos europaeus", common: "Beach isopod", note: "Nocturnal scavenger that recycles stranded seaweed along the upper beach.", status: "expected", wiki: W + "Tylos_(crustacean)", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tylos_punctatus_dorsal.jpg/330px-Tylos_punctatus_dorsal.jpg" },
      { sci: "Charadrius alexandrinus", common: "Kentish plover", note: "Tiny shorebird that nests directly on open sand or fine shingle; give nesting areas plenty of space in spring.", status: "expected", wiki: W + "Kentish_plover", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Kentish_Plover_Charadrius_alexandrinus%2C_India.jpg/330px-Kentish_Plover_Charadrius_alexandrinus%2C_India.jpg" },
      { sci: "Donax trunculus", common: "Wedge clam", note: "Lives buried beneath wet sand, filtering seawater as waves wash overhead.", status: "expected", wiki: W + "Donax_trunculus", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Donax_trunculus_MHNT.jpg/330px-Donax_trunculus_MHNT.jpg" },
    ],
  },
  {
    id: "shallows",
    eyebrow: "Zone 3",
    title: "Shallow Water",
    depth: "0.5 – 5 m",
    lead: "Sun-warmed sand, scattered rocks and the inner edge of the seagrass meadow support many of the fish most easily seen by snorkelers.",
    species: [
      { sci: "Atherina hepsetus", common: "Mediterranean sand smelt", note: "Silvery schools shimmer just below the surface over calm, shallow water.", status: "expected", wiki: W + "Atherina_hepsetus", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Atherina_hepsetus_449181144.jpg/330px-Atherina_hepsetus_449181144.jpg" },
      { sci: "Diplodus vulgaris", common: "Common two-banded seabream", note: "Recognizable by two bold black bands; juveniles gather around rocks and seagrass.", status: "confirmed", wiki: W + "Diplodus_vulgaris", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Mojarra_%28Diplodus_vulgaris%29%2C_Parque_natural_de_la_Arr%C3%A1bida%2C_Portugal%2C_2020-07-31%2C_DD_20.jpg/330px-Mojarra_%28Diplodus_vulgaris%29%2C_Parque_natural_de_la_Arr%C3%A1bida%2C_Portugal%2C_2020-07-31%2C_DD_20.jpg" },
      { sci: "Sarpa salpa", common: "Salema", note: "Herbivorous schools graze algae and seagrass leaves along the meadow’s edge.", status: "confirmed", wiki: W + "Salema_porgy", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Sarpa_salpa_.jpg/330px-Sarpa_salpa_.jpg" },
      { sci: "Dicentrarchus labrax", common: "European seabass", note: "Streamlined predator that cruises shallow coastal water, often near rocks and sandy edges.", status: "confirmed", wiki: W + "European_bass" , img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Sealife%2C_Bray%2C_Ireland._%286985874908%29.jpg/330px-Sealife%2C_Bray%2C_Ireland._%286985874908%29.jpg" },
      { sci: "Sparus aurata", common: "Gilthead seabream", note: "Recognizable by the golden band between its eyes; feeds over sand, rock and seagrass.", status: "confirmed", wiki: W + "Gilt-head_bream" , img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Sparus_aurata%2C_Alpes-Maritimes%2C_Provence-Alpes-C%C3%B4te_d%27Azur%2C_FR_imported_from_iNaturalist_photo_207799710.jpg/330px-Sparus_aurata%2C_Alpes-Maritimes%2C_Provence-Alpes-C%C3%B4te_d%27Azur%2C_FR_imported_from_iNaturalist_photo_207799710.jpg" },
      { sci: "Diplodus sargus", common: "White seabream", note: "Robust silver seabream with dark vertical markings, commonly feeding around rocky shallows.", status: "confirmed", wiki: W + "White_seabream" , img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Sargo_com%C3%BAn_%28Diplodus_sargus%29%2C_Madeira%2C_Portugal%2C_2019-05-31%2C_DD_29.jpg/330px-Sargo_com%C3%BAn_%28Diplodus_sargus%29%2C_Madeira%2C_Portugal%2C_2019-05-31%2C_DD_29.jpg" },
      { sci: "Oblada melanura", common: "Saddled seabream", note: "Silver schooling fish easily recognized by the black saddle-shaped patch near its tail.", status: "confirmed", wiki: W + "Oblada_melanura" , img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Oblada_%28Oblada_melanura%29%2C_%C4%8Airkewwa%2C_Malta%2C_Malta%2C_2021-08-24%2C_DD_26.jpg/330px-Oblada_%28Oblada_melanura%29%2C_%C4%8Airkewwa%2C_Malta%2C_Malta%2C_2021-08-24%2C_DD_26.jpg" },
      { sci: "Lithognathus mormyrus", common: "Striped seabream", note: "Slender seabream with narrow vertical stripes, usually feeding over sandy and mixed bottoms.", status: "confirmed", wiki: W + "Lithognathus_mormyrus" , img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Mormora.jpg/330px-Mormora.jpg" },
      { sci: "Chromis chromis", common: "Mediterranean damselfish", note: "Small dark fish often hovering in loose groups above rocks and reef habitat.", status: "confirmed", wiki: W + "Chromis_chromis" , img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Mediterranean_Damselfish%2C_Var%2C_Provence-Alpes-C%C3%B4te_d%27Azur%2C_FR_imported_from_iNaturalist_photo_140272057_%28cropped%29.jpg/330px-Mediterranean_Damselfish%2C_Var%2C_Provence-Alpes-C%C3%B4te_d%27Azur%2C_FR_imported_from_iNaturalist_photo_140272057_%28cropped%29.jpg" },
      { sci: "Serranus scriba", common: "Painted comber", note: "Colourful ambush predator that waits close to rocks before darting after small prey.", status: "confirmed", wiki: W + "Painted_comber" , img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Serranidae_-_Serranus_scriba.JPG/330px-Serranidae_-_Serranus_scriba.JPG" },
      { sci: "Hippocampus hippocampus", common: "Short-snouted seahorse", note: "Master of camouflage that clings to algae and seagrass with its curled tail.", status: "expected", expectedContext: "suitable habitat", wiki: W + "Hippocampus_hippocampus", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Hippocampus_hippocampus_%28on_Ascophyllum_nodosum%29.jpg/330px-Hippocampus_hippocampus_%28on_Ascophyllum_nodosum%29.jpg" },
      { sci: "Holothuria tubulosa", common: "Cotton-spinner sea cucumber", note: "Slow-moving recycler that feeds on organic material within sandy and mixed seabeds.", status: "expected", wiki: W + "Holothuria_tubulosa", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Holothuria_tubulosa_Banyuls.jpg/330px-Holothuria_tubulosa_Banyuls.jpg" },
    ],
  },
  {
    id: "meadow",
    eyebrow: "Zone 4",
    title: "Posidonia Meadow",
    depth: "5 – 15 m",
    lead: "An endemic Mediterranean seagrass meadow forming one of the coast's richest habitats, with shelter, feeding grounds and complex structure for marine life.",
    species: [
      { sci: "Posidonia oceanica", common: "Neptune grass", note: "A true flowering plant that forms long-lived underwater meadows supporting diverse Mediterranean marine life.", status: "expected", wiki: W + "Posidonia_oceanica", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Posidonia_oceanica_%28L%29.jpg/330px-Posidonia_oceanica_%28L%29.jpg" },
      { sci: "Pinna nobilis", common: "Noble pen shell", note: "The Mediterranean’s largest bivalve; now critically endangered and fully protected.", status: "expected", wiki: W + "Pinna_nobilis", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Pinnidae_-_Pinna_nobilis.jpg/330px-Pinnidae_-_Pinna_nobilis.jpg" },
      { sci: "Octopus vulgaris", common: "Common octopus", note: "Empty shells piled outside a rocky crevice often reveal an occupied den.", status: "expected", wiki: W + "Common_octopus", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Octopus2.jpg/330px-Octopus2.jpg" },
      { sci: "Symphodus tinca", common: "Peacock wrasse", note: "Large colourful wrasse; males become especially vivid during the breeding season.", status: "confirmed", wiki: W + "Symphodus_tinca", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Symphodus_tinca_m%C3%A2le_avec_des_femelles_%28Linnaeus%2C_1758%29.jpg/330px-Symphodus_tinca_m%C3%A2le_avec_des_femelles_%28Linnaeus%2C_1758%29.jpg" },
      { sci: "Coris julis", common: "Mediterranean rainbow wrasse", note: "Fast, colourful wrasse that darts across rocky and vegetated bottoms searching for small prey.", status: "confirmed", wiki: W + "Coris_julis" , img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Doncella_%28Coris_julis%29%2C_Cabo_de_Palos%2C_Espa%C3%B1a%2C_2022-07-17%2C_DD_69.jpg/330px-Doncella_%28Coris_julis%29%2C_Cabo_de_Palos%2C_Espa%C3%B1a%2C_2022-07-17%2C_DD_69.jpg" },
      { sci: "Thalassoma pavo", common: "Ornate wrasse", note: "Brilliantly coloured, fast-moving wrasse most often seen over sunlit rocky habitat.", status: "confirmed", wiki: W + "Thalassoma_pavo" , img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Female_Thalassoma_pavo.JPG/330px-Female_Thalassoma_pavo.JPG" },
      { sci: "Symphodus roissali", common: "Five-spotted wrasse", note: "Small patterned wrasse that searches algae, rocks and seagrass for tiny invertebrates.", status: "confirmed", wiki: W + "Symphodus_roissali" , img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Symphodus_roissali_17-04-06_%28Stefano_Guerrieri%29.jpg/330px-Symphodus_roissali_17-04-06_%28Stefano_Guerrieri%29.jpg" },
      { sci: "Epinephelus marginatus", common: "Dusky grouper", note: "Heavy-bodied ambush predator that shelters around rocky ledges, crevices and reef habitat.", status: "confirmed", wiki: W + "Dusky_grouper" , img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Mero_%28Epinephelus_marginatus%29%2C_Cabo_de_Palos%2C_Espa%C3%B1a%2C_2022-07-15%2C_DD_34.jpg/330px-Mero_%28Epinephelus_marginatus%29%2C_Cabo_de_Palos%2C_Espa%C3%B1a%2C_2022-07-15%2C_DD_34.jpg" },
      { sci: "Sepia officinalis", common: "Common cuttlefish", note: "Master of camouflage that can change colour rapidly and attaches dark egg clusters to vegetation and other structures.", status: "expected", wiki: W + "Common_cuttlefish", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Sepia_com%C3%BAn_%28Sepia_officinalis%29%2C_Parque_natural_de_la_Arr%C3%A1bida%2C_Portugal%2C_2020-07-21%2C_DD_62.jpg/330px-Sepia_com%C3%BAn_%28Sepia_officinalis%29%2C_Parque_natural_de_la_Arr%C3%A1bida%2C_Portugal%2C_2020-07-21%2C_DD_62.jpg" },
    ],
  },
  {
    id: "deep",
    eyebrow: "Zone 5",
    title: "Deep Water & Offshore",
    depth: "15 m and beyond",
    lead: "Beyond the meadow's outer edge — coralligenous reefs, pelagic visitors, and migratory megafauna.",
    species: [
      { sci: "Caretta caretta", common: "Loggerhead sea turtle", note: "Wide-ranging marine turtle that may pass through northern Aegean coastal and offshore waters.", status: "expected", expectedContext: "offshore", wiki: W + "Loggerhead_sea_turtle", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Loggerhead_sea_turtle.jpg/330px-Loggerhead_sea_turtle.jpg" },
      { sci: "Tursiops truncatus", common: "Common bottlenose dolphin", note: "Social coastal dolphin that travels in groups through the gulf and occasionally approaches shore.", status: "confirmed", wiki: W + "Common_bottlenose_dolphin", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Tursiops_truncatus_01-cropped.jpg/330px-Tursiops_truncatus_01-cropped.jpg" },
      { sci: "Phalacrocorax carbo sinensis", common: "Continental great cormorant", note: "Large diving waterbird that swims low in the water and pursues fish beneath the surface.", status: "confirmed", wiki: W + "Great_cormorant" , img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/2021-05-05_Phalacrocorax_carbo_carbo%2C_Killingworth_Lake%2C_Northumberland_1-1.jpg/330px-2021-05-05_Phalacrocorax_carbo_carbo%2C_Killingworth_Lake%2C_Northumberland_1-1.jpg" },
      { sci: "Thunnus thynnus", common: "Atlantic bluefin tuna", note: "Powerful migratory predator of open water that may pass offshore during seasonal movements.", status: "expected", expectedContext: "offshore", wiki: W + "Atlantic_bluefin_tuna", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Bluefin-big.jpg/330px-Bluefin-big.jpg" },
      { sci: "Paramuricea clavata", common: "Violescent sea-whip", note: "Large gorgonian that forms fragile branching colonies on deeper Mediterranean rocky reefs.", status: "expected", expectedContext: "deeper habitat", wiki: W + "Paramuricea_clavata", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Paramuricea_clavata_%28Risso%2C_1826%29_3.jpg/330px-Paramuricea_clavata_%28Risso%2C_1826%29_3.jpg" },
      { sci: "Scyliorhinus canicula", common: "Small-spotted catshark", note: "Small bottom-dwelling shark whose tough egg cases may occasionally wash ashore.", status: "expected", expectedContext: "offshore", wiki: W + "Small-spotted_catshark", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Scyliorhinus_canicula.jpg/330px-Scyliorhinus_canicula.jpg" },
    ],
  },
];

function statusLabel(s: Species): string {
  if (s.status === "confirmed") return "Observed at Kriopigi";
  if (s.expectedContext === "suitable habitat") return "Expected in suitable habitat";
  if (s.expectedContext === "offshore") return "Expected offshore";
  if (s.expectedContext === "deeper habitat") return "Expected in deeper habitat";
  return "Expected in this habitat";
}


function FloraFauna() {
  const t = useT();
  return (
    <SiteLayout>
      <div className="relative h-64 overflow-hidden">
        <img src={posidonia} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-6 max-w-3xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.25em] text-primary-foreground/80">{t("Living Shore")}</p>
          <h1 className="font-serif text-4xl text-primary-foreground">{t("Flora & Fauna")}</h1>
        </div>
      </div>
      <PageHeader eyebrow="Field Catalogue" title="From the pine line to the open sea" lead="Walk from the pine forest above Kriopigi to the open Mediterranean and, within a few hundred metres, the landscape changes repeatedly. Forest becomes shrubland, shrubland gives way to rocky and sandy shore, and beneath the surface entirely different biological communities take over. This page follows that journey from land to sea." />

      {/* Ecosystem context */}
      <div className="px-5 max-w-3xl mx-auto mb-10 space-y-8">
        <section>
          <p className="text-[10px] uppercase tracking-[0.25em] text-accent">{t("The bigger picture")}</p>
          <h2 className="mt-1 font-serif text-2xl text-foreground">{t("A Mediterranean mosaic")}</h2>
          <p className="mt-3 text-foreground/80 leading-relaxed">{t("Kriopigi sits at the edge of a small but unusually diverse coastal landscape. In a few hundred metres, the land rises from the shore through Aleppo pine forest, maquis shrubland, and sun-baked phrygana, while the sea offers rocky ledges, sandy pockets, and beds of Posidonia oceanica. This mosaic exists because the area combines a Mediterranean climate, limestone geology, varied topography, freshwater runoff, and thousands of years of human land use. The result is an unusually high number of habitats packed into a very small area, and with them, a wide range of species.")}</p>
        </section>

        <section className="rounded-2xl bg-card border border-border p-5 shadow-soft">
          <figure className="-mx-5 -mt-5 mb-5 overflow-hidden">
            <img src={pineForestShore} alt={t("Aleppo pines silhouetted above the Kriopigi shoreline at dusk, with the Toronean Gulf glowing pink behind their trunks.")} loading="lazy" className="w-full h-56 object-cover" />
            <figcaption className="px-5 py-2 text-[11px] text-muted-foreground border-b border-border bg-muted/30">{t("Aleppo pine canopy along the bluff above Kriopigi at dusk.")}</figcaption>
          </figure>
          <h3 className="font-serif text-xl text-foreground">{t("The forest above the shore")}</h3>
          <p className="text-[10px] uppercase tracking-[0.25em] text-accent mt-1">{t("Forest canopy")}</p>
          <p className="mt-2 text-sm text-foreground/80 leading-relaxed">{t("The slopes above Kriopigi are dominated by Aleppo pine (Pinus halepensis), one of the defining trees of the eastern Mediterranean. In places it mixes with Turkish pine (Pinus brutia), forming an open, fire-adapted forest well suited to dry limestone soils.")}</p>
          <h3 className="mt-6 font-serif text-xl text-foreground">{t("Maquis underneath")}</h3>
          <p className="text-[10px] uppercase tracking-[0.25em] text-accent mt-1">{t("Dense understory")}</p>
          <figure className="mt-3 -mx-5 overflow-hidden">
            <img src={maquisShrubland} alt={t("A sandy footpath descending through dense maquis shrubland to the turquoise shallows of a Kriopigi cove.")} loading="lazy" className="w-full h-auto object-contain bg-muted" />
            <figcaption className="px-5 py-2 text-[11px] text-muted-foreground bg-muted/30 border-y border-border">{t("Maquis flanking a path down to the cove.")}</figcaption>
          </figure>
          <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{t("Beneath the pines grows dense evergreen maquis — a tangle of kermes oak, lentisk, strawberry tree, wild olive, myrtle, rosemary, sage and thyme. These aromatic shrubs form one of the characteristic ecosystems of the Mediterranean Basin and provide shelter and food for countless insects, reptiles and birds.")}</p>
          <h3 className="mt-5 font-serif text-xl text-foreground">{t("Phrygana on the dry edges")}</h3>
          <p className="text-[10px] uppercase tracking-[0.25em] text-accent mt-1">{t("Degraded / exposed dry edge ecology")}</p>
          <figure className="mt-3 -mx-5 overflow-hidden">
            <img src={phryganaTortoise} alt={t("Dry-edge phrygana habitat above Kriopigi: thin rocky soil, sparse drought-adapted scrub, and a small erosional drainage cut beside a dirt track.")} loading="lazy" className="w-full h-auto object-contain bg-muted" />
            <figcaption className="px-5 py-2 text-[11px] text-muted-foreground bg-muted/30 border-y border-border">{t("Phrygana scrub and a seasonal erosion channel above the shore—typical habitat for Boettger’s tortoise (Testudo hermanni boettgeri), which is occasionally encountered in these dry, open Mediterranean slopes.")}</figcaption>
          </figure>
          <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{t("Where soils are shallower, conditions drier and more exposed, or where repeated fire and grazing maintain a lower shrub community, maquis gives way to phrygana. Phrygana is a natural and widespread Mediterranean ecosystem of low, aromatic, often thorny shrubs; human activity often expands or maintains it, but it is not simply degraded maquis. On the dry slopes above Kriopigi, it forms an important transition zone between forest and open coast.")}</p>
        </section>

        <section className="rounded-2xl bg-card border border-border p-5 shadow-soft">
          <h3 className="font-serif text-xl text-foreground">{t("The coast itself")}</h3>
          <p className="mt-2 text-sm text-foreground/80 leading-relaxed">{t("Rocky ledges, tide pools and small pocket beaches create dozens of microhabitats. Crevices provide shelter from waves and predators, while algae, encrusting organisms and accumulated wrack support diverse communities of molluscs, crustaceans, fishes and other marine life.")}</p>
          <h3 className="mt-5 font-serif text-xl text-foreground">{t("Posidonia meadow offshore")}</h3>
          <p className="mt-2 text-sm text-foreground/80 leading-relaxed">{t("Underwater, the keystone habitat is the Posidonia oceanica meadow. This is not seaweed — it is a true marine flowering plant endemic to the Mediterranean. Its meadows stabilise sediments, improve water clarity, store large amounts of carbon, and provide habitat and refuge for countless marine organisms. They are among the Mediterranean's most important coastal habitats, supporting many juvenile fishes and invertebrates.")}</p>
        </section>

        <section>
          <h3 className="font-serif text-xl text-foreground">{t("Why is biodiversity so high here?")}</h3>
          <p className="mt-2 text-foreground/80 leading-relaxed">{t("Kriopigi combines many habitats in a very small area. Pine forest, maquis, phrygana, rocky shore, sandy patches, Posidonia meadows, freshwater seepage, and the boundaries between them all create a range of ecological niches. Each habitat supports a different set of species, and their closeness allows many plants and animals to coexist in a narrow strip of coast. This habitat diversity, more than any single factor, explains why the shoreline is so rich in life.")}</p>
        </section>

        <section className="rounded-2xl bg-gradient-sea p-5 text-primary-foreground shadow-deep">
          <p className="text-[10px] uppercase tracking-[0.25em] opacity-80">{t("A cultural landscape")}</p>
          <h3 className="mt-1 font-serif text-xl">{t("Not pristine wilderness")}</h3>
          <p className="mt-2 text-sm opacity-90 leading-relaxed">{t("Kriopigi is not untouched wilderness. It is a Mediterranean cultural landscape shaped by millennia of forestry, grazing, agriculture, fire, settlement and tourism. These influences have altered the ecosystems here without erasing their ecological value. Understanding the shore means recognising that human history and natural history are intertwined, and that the landscape we see today is the result of both.")}</p>
        </section>

        <section className="rounded-2xl bg-card border border-border p-5 shadow-soft">
          <p className="text-[10px] uppercase tracking-[0.25em] text-accent">{t("Life Around Kriopigi")}</p>
          <h3 className="mt-1 font-serif text-xl text-foreground">{t("A field catalogue begins")}</h3>
          <p className="mt-2 text-sm text-foreground/80 leading-relaxed">{t("These habitats support a remarkable variety of organisms, from orchids and Mediterranean shrubs to migratory birds, reptiles, reef fishes and dolphins. The catalogue below highlights species photographed in and around Kriopigi. Most observations are linked directly to iNaturalist records, and each species page will eventually include links to additional identification resources and references.")}</p>
        </section>
      </div>


      {/* Zone jump nav */}
      <div className="px-5 max-w-3xl mx-auto mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          {zones.map((z) => (
            <a key={z.id} href={`#${z.id}`} className="shrink-0 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-foreground/80 hover:bg-muted transition-colors whitespace-nowrap">
              {t(z.title)}
            </a>
          ))}
        </div>
      </div>

      <div className="px-5 max-w-3xl mx-auto pb-8 space-y-10">
        {zones.map((z, idx) => (
          <section key={z.id} id={z.id} className="scroll-mt-20">
            <div className="flex items-baseline justify-between gap-3 border-b border-border pb-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-accent">{t(z.eyebrow)}</p>
                <h2 className="font-serif text-3xl text-foreground">{t(z.title)}</h2>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{t(z.depth)}</span>
            </div>
            <p className="mt-3 text-muted-foreground leading-relaxed">{t(z.lead)}</p>

            <ul className="mt-5 grid gap-3">
              {z.species.map((s) => (
                <li key={s.sci} id={speciesSlug(s.sci)} className="scroll-mt-24 rounded-xl bg-card border border-border shadow-soft overflow-hidden flex gap-3">
                  {s.img && (
                    <img
                      src={s.img}
                      alt={`${t(s.common)} (${s.sci})`}
                      loading="lazy"
                      className="w-24 h-24 sm:w-28 sm:h-28 object-cover flex-shrink-0 bg-muted"
                    />
                  )}
                  <div className="flex-1 min-w-0 p-3 sm:p-4">
                    <div className="flex items-baseline justify-between gap-3 flex-wrap">
                      {s.wiki ? (
                        <a href={s.wiki} target="_blank" rel="noopener noreferrer" className="font-serif italic text-base sm:text-lg text-foreground underline decoration-accent/40 underline-offset-4 hover:decoration-accent">
                          {s.sci}
                        </a>
                      ) : (
                        <h3 className="font-serif italic text-base sm:text-lg text-foreground">{s.sci}</h3>
                      )}
                      <span className="text-xs text-accent">{t(s.common)}</span>
                    </div>
                    <p className="mt-1.5 text-sm text-foreground/75 leading-relaxed">{t(s.note)}</p>
                    <p className={`mt-2 text-xs flex items-center gap-1 ${s.status === "confirmed" ? "text-accent" : "text-muted-foreground"}`}>
                      {s.status === "confirmed" ? <span aria-hidden>✓</span> : <span aria-hidden className="w-1 h-1 rounded-full bg-muted-foreground/60" />}
                      {t(statusLabel(s))}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {z.id === "meadow" && (
              <div id={speciesSlug("Noctiluca scintillans")} className="scroll-mt-24 mt-5 rounded-xl border border-dashed border-border bg-muted/30 p-4 flex gap-3">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Noctiluca_scintillans_varias.jpg/330px-Noctiluca_scintillans_varias.jpg"
                  alt={`${t("Sea sparkle")} (Noctiluca scintillans)`}
                  loading="lazy"
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg flex-shrink-0 bg-muted"
                />
                <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-[0.25em] text-accent">{t("Plankton & Open Water")}</p>
                <div className="mt-1 flex items-baseline justify-between gap-3 flex-wrap">

                  <a href="https://en.wikipedia.org/wiki/Noctiluca_scintillans" target="_blank" rel="noopener noreferrer" className="font-serif italic text-base sm:text-lg text-foreground underline decoration-accent/40 underline-offset-4 hover:decoration-accent">
                    Noctiluca scintillans
                  </a>
                  <span className="text-xs text-accent">{t("Sea sparkle")}</span>
                </div>
                <p className="mt-1.5 text-sm text-foreground/75 leading-relaxed">{t("A single-celled planktonic dinoflagellate — neither animal nor plant — whose blooms can produce blue bioluminescent flashes when the water is disturbed at night.")}</p>
                <p className="mt-2 text-xs text-accent flex items-center gap-1">
                  <span aria-hidden>✓</span>
                  {t("Observed at Kriopigi")}
                </p>
                </div>
              </div>

            )}
          </section>

        ))}
      </div>
    </SiteLayout>
  );
}
