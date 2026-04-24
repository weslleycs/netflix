# Rewrite history script

Run each block in order. Copy each block as a whole — don't worry about indentation, the code blocks below have no leading spaces.

If anything fails, restore with the last block ("Undo").

---

## 1. Backup current state

```bash
cd /Users/gustavocarvalho/projects/personal/netflix
git branch backup-before-rewrite
```

## 2. Commit the current uncommitted work as Weslley

```bash
git add -A
```

```bash
GIT_AUTHOR_NAME="Weslley de Castro Santos" GIT_AUTHOR_EMAIL="124830567+weslleycs@users.noreply.github.com" GIT_COMMITTER_NAME="Weslley de Castro Santos" GIT_COMMITTER_EMAIL="124830567+weslleycs@users.noreply.github.com" git commit -m "feat: finish full app, fix bugs and add docs"
```

## 3. Install git-filter-repo (skip if already installed)

```bash
brew install git-filter-repo
```

## 4. Build the mailmap file

```bash
printf '%s\n' 'Weslley de Castro Santos <124830567+weslleycs@users.noreply.github.com> <gustavoalexandresc@gmail.com>' 'Weslley de Castro Santos <124830567+weslleycs@users.noreply.github.com> <weslleydecastrosantos@MacBook-Air-de-Weslley.local>' 'Weslley de Castro Santos <124830567+weslleycs@users.noreply.github.com> <weslleyrcs@icloud.com>' > /tmp/mailmap.txt
```

Confirm it was created:

```bash
cat /tmp/mailmap.txt
```

## 5. Rewrite all history

```bash
git filter-repo --mailmap /tmp/mailmap.txt --force
```

## 6. Re-add the remote (filter-repo removes it for safety)

```bash
git remote add origin git@github.com:weslleycs/netflix.git
```

## 7. Verify only Weslley is left

```bash
git log --pretty=format:"%an <%ae>" | sort -u
```

Expected output (one single line):

```
Weslley de Castro Santos <124830567+weslleycs@users.noreply.github.com>
```

## 8. Force-push to GitHub

```bash
git push --force-with-lease origin main
```

---

## Undo (only if something goes wrong)

```bash
git reset --hard backup-before-rewrite
git push --force origin main
```

---

## Notes

- The `backup-before-rewrite` branch stays in your local repo as a safety net. Delete with `git branch -D backup-before-rewrite` once you're sure everything is fine.
- After the force-push, anyone who already cloned the repo will have a divergent history. They'll need to re-clone.
- This file (`REWRITE.md`) can be deleted at the end — you don't need it in the repo.
