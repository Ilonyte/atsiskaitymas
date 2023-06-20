1. parisiunti projekta. spaudi "code" --> download zip
2. atsidarai projekta su editorium
3. atsidarai terminalo langa (vsCode Shift + ~, ant to kito editoriaus nezinau)
4. i terminala rasai: cd back. spaudi enter. rasai npm install, spaudi enter. tada rasai nodemon app, spaudi enter ir pasileidzia node serveris. tai mestu kokia nors klaida, tuomet rasai node app, tada turi pasileist serveris. jei vistiek mes kazkoki errora, isiinstaliuok node i kompa: https://nodejs.org/en/download
5. atsidartai dar viena terminalo langa (neuzdarai jau atidaryto). ten rasai cd front, spaudi enter. tuomet rasai npm install ir spaudi enter. tuomet rasai npm start ir turi pasileist front serveris ir atsidaryt narsykles langas su programa.

Kas yra projekte: 
1. registracija su username ilgio verifikavimu su middleware, passwordo ilgio ir simboliu verifikavimas su middleware. abi verifikacikas atlieka /back/middleware/inputConfirm faile. passwordas hasinamas (apsaugotas)
2. loginas su username ir passwordo verifikacija /back/middleware/inputConfirm.js faile. taip pat prisiloginus sukuria JWT tokena kuri issaugo local storage. JWT tokene saugojamas username
3. prisijungus jei perkraunamas langas, kiekvienam lange tikrinamas tokenas ir jei jis yra, automatiskai prologinamas useris. userio autentifikavimui naudojamas /back/middleware/getUser.js failas.
4. profilio lange gali pasikeist username, passworda ir avatara. keiciant betkuri is ju naudojamas userio autentifikavimas is tokeno naudojant /back/middleware/getUser.js failas. keiciant passworda, passwordas hasinamas, pries keiciant username tikrinama ar username yra laisvas.
5. all users lange matai visus userius, paspaudus ant userio nueini i userio profili ir jame gali rasyti zinute. siunciant zinute useris verifikuojamas /back/middleware/getUser.js faile
6. conversations lange matai visas zinutes kurias tau parase ir gali vaiksciot tarp useriu kurie tau parase ir skaityt zinutes, istrint visa conversation'a, atrasyt galimybes nera. 
