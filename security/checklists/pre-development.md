# Pre-Development Security Checklist

<!--
  Dung truoc khi bat dau viet bat ky feature hoac thay doi lon nao.
  Ket qua cua checklist nay la input cho viec thiet ke.
  Khong can dien day du — chi dien nhung muc lien quan den feature.
  Luu lai ket qua cung PR hoac trong ticket.
-->

## 1 — Hieu ro Requirement

```
[ ] Requirement duoc viet thanh van ban (khong chi noi mieng)?
[ ] Cac truong hop bien (edge case) da duoc xac dinh?
[ ] Input / Output da ro rang?
[ ] Hieu vi sao feature nay ton tai (khong chi "sao lai viet cai nay")?
```

## 2 — Nguoi dung va Quyen

```
[ ] Ai duoc phep dung chuc nang nay?
    - [ ] Unauthenticated user
    - [ ] Authenticated user (bat ky)
    - [ ] User co role cu the: _______________
    - [ ] Admin
    - [ ] He thong / Service account

[ ] Resource-level: user chi xem/sua du lieu cua chinh minh?
    (neu co: can IDOR check)
```

## 3 — Du lieu nhay cam

```
[ ] Feature co xu ly du lieu CONFIDENTIAL hoac SENSITIVE khong?
    (Tham chieu .agents/rules/06-data-privacy.md)
    - [ ] So dien thoai
    - [ ] CCCD / CMND
    - [ ] Thong tin thanh toan
    - [ ] Lich su giao dich

[ ] Neu co: da co ke hoach:
    - [ ] Masking khi log
    - [ ] Khong expose qua API response khong can thiet
    - [ ] Storage security
```

## 4 — Threat Assessment nhanh

Tra loi 4 cau hoi sau (dung threat-modeling skill neu feature phuc tap):

```
1. Ke tan cong co the lam gi voi feature nay?
   _______________________________________________________

2. Du lieu nao co the bi lo?
   _______________________________________________________

3. Co the bi abuse khong (nhieu lan, bot, wrong user)?
   _______________________________________________________

4. Security control nao can de giam thieu rui ro?
   _______________________________________________________
```

## 5 — Architecture check

```
[ ] Da kiem tra: co module/function nao hien co xu ly muc dich tuong tu?
[ ] Feature se dat trong layer nao? (Presentation / Application / Domain / Infra)
[ ] Khong tao file/thu muc moi neu co the dung cai cu?
[ ] Dependency moi co can thiet? (neu co: chay quy trinh trong 07-dependency.md)
```

## 6 — API Contract (neu co API)

```
[ ] Endpoint va HTTP method da xac dinh?
[ ] Request schema da xac dinh (fields, types, constraints)?
[ ] Response schema da xac dinh (fields duoc tra ve)?
[ ] Error codes da xac dinh (400, 401, 403, 404, 500)?
[ ] Authentication requirement da xac dinh?
```

## 7 — Test Plan nhanh

```
[ ] Happy path: _______________________________________________
[ ] Error cases:
    [ ] Invalid input
    [ ] Unauthorized (no token)
    [ ] Forbidden (wrong role / wrong owner)
    [ ] Not found
[ ] Security test cases:
    [ ] IDOR (neu co resource ID)
    [ ] Rate limit (neu co action quan trong)
```

---

**Ket luan truoc khi bat dau code:**

```
[ ] Tat ca cau hoi quan trong da co cau tra loi
[ ] Threat assessment nhanh da hoan thanh
[ ] API contract da clear
[ ] Co the bat dau code
```

Neu chua xong: hoi nguoi co quyen quyet dinh, khong tu y gia su va bat dau code.
