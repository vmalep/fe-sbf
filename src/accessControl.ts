import { newModel, MemoryAdapter } from "casbin.js";

export const model = newModel(`
[request_definition]
r = sub, obj, act
[policy_definition]
p = sub, obj, act
[role_definition]
g = _, _
[policy_effect]
e = some(where (p.eft == allow))
[matchers]
m = g(r.sub, p.sub) && keyMatch(r.obj, p.obj) && regexMatch(r.act, p.act)
`);

export const adapter = new MemoryAdapter(`
p, admin, books, (list) | (create)
p, admin, books/*, (show) | (edit) | (delete)
p, admin, library, (list) | (create)
p, admin, library/*, (show) | (edit) | (delete)
p, admin, courses, (list) | (create)
p, admin, courses/*, (show) | (edit) | (delete)
p, admin, school-years, (list) | (create)
p, admin, school-years/*, (show) | (edit) | (delete)
p, admin, users, (list) | (create)
p, admin, users/*, (show) | (edit) | (delete)

p, authenticated, books, (list) | (create)
p, authenticated, books/*, (show) | (edit) | (delete)
p, authenticated, library, list
p, authenticated, library/*, show
p, authenticated, courses, list
p, authenticated, courses/*, show
p, authenticated, school-years, list
p, authenticated, school-years/*, show
p, authenticated, users, list
p, authenticated, users/*, show

p, public, books, list
p, public, books/*, show
p, public, library, list
p, public, library/*, show
p, public, courses, list
p, public, courses/*, show
p, public, school-years, list
p, public, school-years/*, show
`);