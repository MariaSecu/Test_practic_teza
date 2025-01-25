<<<<<<< HEAD
Proiect pentru teza de an care v-a include un set de teste automatizate pentru un site de cumparaturi.

1.login page (Autentificare și deconectare)
TC1: Creare unui nou acount
Pasi:
Navigheaza la pagina principala
Click Create account
Introdu credentiale valide
Noul acount este creat
TC1.1: Autentificare cu credențiale valide
Pași:
Navighează la pagina de login.
Introdu un email valid și o parolă corectă.
Apasă pe butonul de "Login".
Rezultat așteptat: Utilizatorul este autentificat și redirecționat la pagina principală.
TC2: Eroare pentru email invalid
Pași:
Navighează la pagina de login.
Introdu un email invalid (ex. test@invalid).
Introdu o parolă corectă.
Apasă pe "Login".
Rezultat așteptat: Este afișat un mesaj de eroare: "Email invalid."
TC3: Eroare pentru parolă greșită
Pași:
Navighează la pagina de login.
Introdu un email valid și o parolă greșită.
Apasă pe "Login".
Rezultat așteptat: Este afișat un mesaj de eroare: "Parolă incorectă."
TC4: Recuperarea parolei pentru un cont existent
Pași:
Navighează la pagina de login.
Click Forgot password
Introdu emailul
Rezultat așteptat: Este afișat un mesaj de succes"
TC5: Logout
Pași:
Autentifică-te cu credențiale valide.
Apasă pe butonul "Logout".
Rezultat așteptat: Utilizatorul este deconectat și redirecționat la pagina principală.

2.Cart page (Gestionarea coșului de cumpărături)
TC1: Un client nou poate adauga un produs în coș
Pași:
Creaza un nou cont
Navighează la pagina unui produs.
Apasă pe "Add to Cart".
Rezultat așteptat: Produsul apare în coș, iar contorul coșului este actualizat.
TC2: Eliminarea unui produs din coș
Pași:
Adaugă un produs în coș.
Mergi la pagina de coș.
Apasă pe "Remove".
Rezultat așteptat: Produsul este eliminat, iar coșul este gol.
TC3: Adăugarea mai multor produse din categoria femei
Pași:
Adaugă mai multe produse diferite în coș.
Rezultat așteptat: Toate produsele apar în coș cu cantitatea corectă.
TC4: Adauga un produs in cart si completeaza adresa de livrare
Pași:
Logheazate si adauga un prodeus
Intra in cart
completeaza adresa si fa click Next
Rezultat așteptat: Adresa este completata cu succes


3.Checkout  (Procesul de checkout)
TC1: Checkout complet cu un utilizator nou creat
Pași:
Creaza un cont nou
Adaugă un produs în coș.
Mergi la pagina de checkout.
Completează toate câmpurile obligatorii cu date valide.
Apasă pe "Place Order".
Rezultat așteptat: Comanda este plasată cu succes.
TC2:Checkout complet cu un utilizator existent
Logare cu un utilizator existent
Adaugă un produs în coș.
Mergi la pagina de checkout.
Apasa "Place order"
Continua cumparaturile
TC3: Mesaje de eroare pentru câmpuri necompletate
Pași:
Creaza un cont nou
Adaugă un produs în coș.
Navighează la pagina de checkout.
Lasă toate câmpurile goale.
Apasă pe "Next".
Rezultat așteptat: Sunt afișate mesaje de eroare pentru fiecare câmp necompletat.
TC4: Plasarea unei comenzi cu un discount cod invalid
Pași:
Logheazate cu un user existent
Apasă pe "Place Order".
Introdu discount cod gresit 
Sterge discount si plaseaza comanda
Rezultat așteptat:Este afisat un mesaj de eroare, dar Comanda este plasata fara discount
TC5: Salvarea informațiilor de livrare
Pași:
Creaza un nou user
Navigheaza la "manage address" si completeaza campurile
Bifează "Save".
Rezultat așteptat: Adresa este salvată pentru comenzi viitoare.
4.Search field (Funcționalitatea de căutare)
TC1: Căutare cu termen valid
Pași:
Introdu un termen valid în bara de căutare.
Apasă pe "Search".
Rezultat așteptat: Rezultatele relevante sunt afișate.
TC2: Căutare fără rezultate
Pași:
Introdu un termen inexistent.
Apasă pe "Search".
Rezultat așteptat: Este afișat un mesaj: "No results found."
TC3: Căutare cu filtre
Pași:
Introdu un termen în bara de căutare.
Aplică filtre (ex. categorie sau preț).
Rezultat așteptat: Rezultatele sunt filtrate corect.
TC4: Căutare cu câmp gol
Pași:
Lasă bara de căutare goală.
Apasă pe "Search".
Rezultat așteptat: Este afișat un mesaj de eroare: "Please enter a search term."
TC5: Verificarea sugestiilor din timpul scrierii
Pași:
Introdu un termen parțial.
Observă sugestiile afișate.
Rezultat așteptat: Sunt afișate sugestii relevante.
5.Profile pagejs (Pagina de profil)
TC1: Editarea informațiilor personale
Pași:
Navighează la pagina de profil.
Editează numele și salvează modificările.
Rezultat așteptat: Modificările sunt salvate.
TC2: Schimbarea parolei
Pași:
Navighează la secțiunea de schimbare a parolei.
Introdu parola veche și o parolă nouă.
Salvează modificările.
Rezultat așteptat: Parola este schimbată.
TC3: Validarea câmpurilor goale
Pași:
Navighează la pagina de profil.
Lasă câmpurile goale și apasă pe "Save".
Rezultat așteptat: Este afișat un mesaj de eroare.
TC4: Upload poza de profil
Pași:
Navighează la pagina de profil.
Încarcă o poză de profil.
Salvează modificările.
Rezultat așteptat: Poza este încărcată cu succes.
TC5: Dezactivarea contului
Pași:
Navighează la secțiunea de dezactivare a contului.
Confirmă acțiunea.
Rezultat așteptat: Contul este dezactivat.
=======
# Test_practic-teza
Test_practic teza
>>>>>>> d7d89595666d60e2da1dadebb5e0c3a3ac60c832
