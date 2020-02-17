# Site Map

<table>
<tr>
<td>
Danilo Chiarlone
</td>
<td>
34441162
</td>
<td>
Sheyla Alvarez
</td>
<td>
24165152
</td>
</tr>
</table>

## Abstraction 1

```mermaid
graph TD;
  Hom[Home] --- Log[Login];
  Hom --- Vies[View Posts];
  Log --- |User|Reg[Register];
  Log ---|Admin| VAP[View all posts/ delete posts];
  VAP --- VAU[View all users/delete user];
  Reg --- Myb[My Blog];
  Myb --- Mak[Make post];
  Mak --- Vie[View Post];
  Vie --- ED[Edit/Delete];
```

## Abstraction 2

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
