```mermaid
graph TD;
  Hom[Home] --- Log[Login];
  Hom --- Vies[View Posts];
  Log --- |User|Reg[Register];
  Log ---|Admin| VAP[View all posts/ delete posts];
  VAP --- VAU[View all users/delete user];
  Reg --- Myb[My Blog];
  Reg --- Myp[My profile]
  Myp --- val[Edit profile];
  val --- sel2[Select picture];
  Myb --- Mak[Make post];
  Mak --- Vie[View Post];
  Vie --- ED[Edit/Delete];
```
