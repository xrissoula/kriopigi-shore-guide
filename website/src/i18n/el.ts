/**
 * Greek translations, keyed by the exact English source string.
 * Any string without an entry falls back to English.
 */
import { elPages } from "./el.pages";
import { elFlora } from "./el.flora";
import { elGeology } from "./el.geology";
import { elBiogeochemistry } from "./el.biogeochemistry";
import { elAnthropology } from "./el.anthropology";
import { elConservation } from "./el.conservation";
import { elSnorkel } from "./el.snorkel";
import { elSea } from "./el.sea";

export const el: Record<string, string> = {
  ...elPages,
  ...elFlora,
  ...elGeology,
  ...elBiogeochemistry,
  ...elAnthropology,
  ...elConservation,
  ...elSnorkel,
  ...elSea,



  // --- Navigation / layout ---
  Home: "Αρχική",
  Kriopigi: "Κρυοπηγή",
  "Flora & Fauna": "Χλωρίδα & Πανίδα",
  Map: "Χάρτης",
  History: "Ιστορία",
  Voices: "Φωνές",
  Care: "Προστασία",
  Snorkel: "Κατάδυση",
  Sea: "Θάλασσα",
  Submit: "Συμμετοχή",
  About: "Σχετικά",
  "Shore Guide": "Οδηγός Ακτής",
  '"If you take Greece apart, in the end all that will remain are an olive tree, a vine, and a ship. Which means: with those three things, you can build her again." — Odysseas Elytis':
    '«Αν αποσυνθέσεις την Ελλάδα, στο τέλος θα σου απομείνουν μια ελιά, ένα αμπέλι κι ένα καράβι. Που σημαίνει: με άλλα τόσα την ξαναφτιάχνεις.»\n— Οδυσσέας Ελύτης',
  "Kriopigi Shore Guide · Halkidiki, Greece":
    "Οδηγός Ακτής Κρυοπηγής · Χαλκιδική, Ελλάδα",
  English: "Αγγλικά",
  Greek: "Ελληνικά",

  // --- Home ---
  "Halkidiki · Kassandra Peninsula": "Χαλκιδική · Χερσόνησος Κασσάνδρας",
  "A field guide to the": "Ένας οδηγός πεδίου για την",
  "Kriopigi shore": "ακτή της Κρυοπηγής",
  "Walk the cove with us — through species, stories, and the slow language of the Aegean.":
    "Περπατήστε μαζί μας στον όρμο, μέσα από είδη, ιστορίες και την αργή γλώσσα του Αιγαίου.",
  "Open the map": "Άνοιγμα χάρτη",
  "Aerial view of Kriopigi Beach at golden hour":
    "Αεροφωτογραφία της παραλίας Κρυοπηγής στο χρυσό φως",
  "A living archive": "Ένα ζωντανό αρχείο",
  "Where pine forest meets a wine-dark sea.":
    "Όπου το πευκοδάσος συναντά την οινοπόρφυρη θάλασσα.",
  "Kriopigi — \"cold spring\" — sits on the eastern Kassandra coast, on the Toronean Gulf, a crescent of fine sand under Aleppo pines, looking out over what Homer called the oînops póntos, the wine-dark sea. This guide gathers what locals, scientists, and travelers have learned of its tides, meadows, and migrants.":
    "Η Κρυοπηγή — που πήρε το όνομά της από την «κρύα πηγή» — απλώνεται στην ανατολική ακτή της Κασσάνδρας, στον κόλπο του Τορωναίου, μια ημισέληνος ψιλής άμμου κάτω από χαλέπια πεύκα, αγναντεύοντας αυτό που ο Όμηρος αποκάλεσε οἴνοπα πόντον, τη σκοτεινή σαν κρασί θάλασσα. Αυτός ο οδηγός συγκεντρώνει όσα έχουν παρατηρήσει και καταγράψει κάτοικοι, επιστήμονες και ταξιδιώτες για τα νερά, τα λιβάδια και τα μεταναστευτικά είδη της περιοχής.",
  "Interactive Map": "Διαδραστικός Χάρτης",
  "Trails, springs, dive points & access notes.":
    "Μονοπάτια, πηγές, σημεία κατάδυσης και σημειώσεις πρόσβασης.",
  "Five ecological zones, from pine line to open sea.":
    "Πέντε οικολογικές ζώνες, από τη γραμμή των πεύκων έως την ανοιχτή θάλασσα.",
  Snorkeling: "Κατάδυση με αναπνευστήρα",
  "Three coves, mapped with depth & visibility.":
    "Τρεις κολπίσκοι, χαρτογραφημένοι με βάθος και ορατότητα.",
  Conservation: "Προστασία",
  "Posidonia meadows & how to tread lightly.":
    "Λιβάδια της Ποσειδωνίας και πώς να πατάμε ελαφρά.",
  Section: "Ενότητα",

  // --- Field Notes (History) hub ---
  "Field Notes": "ΣΗΜΕΙΩΣΕΙΣ ΠΕΔΙΟΥ",
  "A chronological reading of the shore": "Μια χρονολογική ανάγνωση της ακτής",
  "Three layers, in order: the rock beneath, the people upon it, and the life that returns each season.":
    "Τρία διαδοχικά στρώματα: πρώτα ο βράχος που βρίσκεται από κάτω, έπειτα οι άνθρωποι που έζησαν πάνω του και τέλος η ζωή που επιστρέφει κάθε εποχή.",
  "I · Deep Time": "I · ΒΑΘΥΣ ΧΡΟΝΟΣ",
  "Geological & Natural History": "Γεωλογική & Φυσική Ιστορία",
  "How tectonics, limestone, and the cold spring shaped the cove and its ecosystem.":
    "Πώς οι τεκτονικές διεργασίες, ο ασβεστόλιθος και η κρύα πηγή διαμόρφωσαν τον όρμο και το οικοσύστημά του.",
  "II · Human Time": "II · Η ΕΠΟΧΗ ΤΟΥ ΑΝΘΡΩΠΟΥ",
  "Anthropological History": "Ανθρωπολογική Ιστορία",
  "From the first settlers of Halkidiki through Byzantine villages to modern tourism.":
    "Από τους πρώτους οικιστές της Χαλκιδικής, στα βυζαντινά χωριά και μέχρι τον σύγχρονο τουρισμό.",
  "III · Living Shore": "III · Η ΖΩΝΤΑΝΗ ΑΚΤΗ",
  "Living Shore": "Η ΖΩΝΤΑΝΗ ΑΚΤΗ",
  "A field catalogue from the dune line outward — beach, surf, shallows, and deep water.":
    "Ένας κατάλογος πεδίου που ακολουθεί την ακτή από τις αμμοθίνες προς τα ανοιχτά — παραλία, ζώνη κυματισμού, ρηχά και βαθιά νερά.",
  "Read section →": "Διαβάστε την ενότητα →",

  Depth: "Βάθος",
  Visibility: "Ορατότητα",


  // --- About ---
  "A naturalist's notebook for a familiar shore":
    "Το σημειωματάριο ενός φυσιοδίφη για μια οικεία ακτή",
  "The Kriopigi Shore Guide is a personal, evolving project — part field journal, part living archive.":
    "Ο Οδηγός Ακτής Κρυοπηγής είναι ένα προσωπικό έργο που εξελίσσεται διαρκώς — κάτι ανάμεσα σε ημερολόγιο πεδίου και ζωντανό αρχείο.",
  "Birdwatching at dawn in a meadow above Kriopigi Beach, near my house in the Amparoudes.":
    "Παρατήρηση πουλιών την αυγή σε λιβάδι πάνω από την παραλία της Κρυοπηγής, κοντά στο σπίτι μου στους Αμπαρούδες.",
  "My name is Christina Anthemides-Kelley, and I am a Greek-American writer, sailor, and lifelong visitor to Kriopigi and the Kassandra peninsula. My family has deep roots in Greece, and I have spent much of my life returning to this coastline — swimming its coves, walking its forest paths, observing its seasonal changes, and slowly developing a deeper curiosity about the systems that shape it.":
    "Ονομάζομαι Χριστίνα Ανθεμίδη-Κέλλυ. Είμαι Ελληνοαμερικανίδα συγγραφέας, ιστιοπλόος και επισκέπτρια της Κρυοπηγής και της χερσονήσου της Κασσάνδρας από παιδί. Η οικογένειά μου έχει βαθιές ρίζες στην Ελλάδα και έχω περάσει μεγάλο μέρος της ζωής μου επιστρέφοντας ξανά και ξανά σε αυτή την ακτή — κολυμπώντας στους όρμους της, περπατώντας τα δασικά μονοπάτια της, παρατηρώντας τις εποχικές αλλαγές της και αποκτώντας σταδιακά μια βαθύτερη περιέργεια για τα συστήματα που τη διαμορφώνουν.",
  "Over time, I became increasingly interested not only in the beauty of the landscape, but in the relationships beneath it: the geology that formed the peninsula, the Mediterranean ecosystems that thrive here, the springs and drainage channels that connect hillside to sea, the underwater Posidonia meadows offshore, and the layers of human history embedded throughout the region.":
    "Με τον καιρό, άρχισα να ενδιαφέρομαι όχι μόνο για την ομορφιά του τοπίου, αλλά και για τις σχέσεις που κρύβονται πίσω από αυτό: τη γεωλογία που διαμόρφωσε τη χερσόνησο, τα μεσογειακά οικοσυστήματα που ευδοκιμούν εδώ, τις πηγές και τα ρέματα που συνδέουν τις πλαγιές με τη θάλασσα, τα υποθαλάσσια λιβάδια της Ποσειδωνίας ανοιχτά της ακτής, καθώς και τα ίχνη της ανθρώπινης παρουσίας που είναι διάσπαρτα σε όλη την περιοχή.",
  "My background in sailing, natural history, conservation, preservation, and storytelling shaped the beginning of this project. What started as personal field notes and photography gradually evolved into an attempt to document Kriopigi as a living coastal system — one shaped by climate, ecology, tectonics, memory, and human activity across thousands of years.":
    "Η εμπειρία μου στην ιστιοπλοΐα, τη φυσική ιστορία, την προστασία, τη διατήρηση και τη διήγηση στάθηκε η αφετηρία αυτού του έργου. Αυτό που ξεκίνησε ως προσωπικές σημειώσεις πεδίου και φωτογραφίες εξελίχθηκε με τον καιρό σε μια προσπάθεια τεκμηρίωσης της Κρυοπηγής σε ένα ζωντανό παράκτιο σύστημα — που διαμορφώνεται από το κλίμα, την οικολογία, τις τεκτονικές διεργασίες, τη μνήμη και την ανθρώπινη δραστηριότητα επί χιλιάδες χρόνια.",
  "The Kriopigi Shore Guide is an evolving natural history and cultural landscape project combining ecology, geology, oral history, photography, and geospatial storytelling. My hope is that it becomes both a long-term archive and an invitation to observe the coastline with greater depth, curiosity, and care.":
    "Ο Οδηγός Ακτής Κρυοπηγής είναι ένα έργο φυσικής ιστορίας και πολιτισμικού τοπίου που εξελίσσεται διαρκώς, συνδυάζει οικολογία, γεωλογία, προφορική ιστορία, φωτογραφία και χαρτογράφηση του τόπου. Ελπίζω να γίνει τόσο ένα μακροπρόθεσμο αρχείο όσο και μια πρόσκληση να παρατηρούμε αυτή την ακτή με περισσότερη προσοχή, περιέργεια και φροντίδα.",
  "Project facts": "Στοιχεία του έργου",
  "Project start": "Έναρξη έργου",
  "First published": "Πρώτη δημοσίευση",
  "Species recorded": "Είδη που έχουν καταγραφεί",
  "54 (and counting)": "54 (και συνεχίζουν να αυξάνονται)",
  "iNaturalist observations": "Παρατηρήσεις στο iNaturalist",
  "48 confirmed": "48 επιβεβαιωμένες",
  "Last updated": "Τελευταία ενημέρωση",
  "August 2026": "Αύγουστος 2026",
  "Status": "Κατάσταση",
  "Ongoing": "Σε συνεχή εξέλιξη",
};
