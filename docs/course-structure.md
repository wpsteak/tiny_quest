# Course Structure

## Level Index Changes

Course pages live in `src/data/levels.js`. Several parts of the app refer to
levels by numeric index, so inserting, removing, or reordering levels requires a
small checklist.

Check these files when the level order changes:

- `src/data/chapters.js`: update every later `startIndex`.
- `src/data/levels.js`: update `cumulativeFrom` if the inserted level is before
  a chained sort level.
- `src/state/storage.js`: bump `STORAGE_KEY` when level order changes.

Some sort levels do not start from a source pile. Use `initialPlacements` to
place cards directly into zones at the start, and `hideSource: true` when the
task should be about reorganizing an existing structure instead of sorting loose
cards. Use `sink` when the level needs a dedicated collection area for cards
that should be removed from module zones. The sink is displayed below the module
zones so adding or removing it does not shift the source and module columns.

`cumulativeFrom` means a sort level starts from a previous sort level's state.
If the referenced index is wrong, later levels can inherit the wrong items or
placements. Use `carryForward: "persistent"` with `cumulativeFrom` when only
items marked `carryForward: true` should continue, such as keeping an
established SSOT card while dropping cards moved to a sink area.

Current chained levels:

- Level index `4` depends on `3`.
- Level index `5` depends on `4`.
- Level index `8` depends on `7`.
- Level index `9` depends on `8`.
- Level index `14` depends on `13`.
- Level index `18` depends on `17`.

Stored progress is also index-based. If existing users have localStorage from an
older course order, their saved `currentLevel`, `chapterProgress`,
`completedLevels`, and `gameStates` may point at the wrong levels. Bumping
`STORAGE_KEY` starts them from a clean state and avoids mismatched progress.
