import { Console, Data, Effect } from "effect";
import { build } from "electron-builder";
import * as pkg from "./package.json";

class BuildError extends Data.TaggedError("electron-build-error")<{
  cause: unknown;
}> {}

const buildStep = () =>
  build({
    config: {
      appId: "com.apollo.app",
      productName: "Apollo",
      protocols: [
        {
          name: "apollo-protocol",
          schemes: [
            "apollo-desk://",
          ],
        },
      ],
      artifactName:
        "${productName}-${version}_${platform}_${arch}_Setup.${ext}",
      buildDependenciesFromSource: true,
      files: ["out/**/*"],
      directories: {
        output: "release/${version}",
      },
      mac: {
        target: ["dmg"],
        icon: "build/osx.icns",
      },
      win: {
        target: [
          {
            target: "nsis",
            arch: ["x64"],
          },
        ],
        icon: "build/win.ico",
      },
      linux: {
        target: [
          {
            target: "AppImage",
          },
        ],
        icon: "build/unix.png",
      },
      nsis: {
        oneClick: true,
        perMachine: true,
        runAfterFinish: true,
        installerIcon: "build/win.ico",
        uninstallerIcon: "build/win.ico",
      },
    },
  });

const runBuild = Effect.gen(function* () {
  yield* Effect.logInfo(`Attempting to build ${pkg.name}`);

  yield* Effect.tryPromise({
    try: async () =>
      await buildStep().then((response) => Console.log(response.join("\n"))),
    catch: (cause) => new BuildError({ cause }),
  });
}).pipe(
  Effect.scoped,
  Effect.catchAll((e) => Effect.logFatal(`${e.message}:${e.cause}`)),
  Effect.annotateLogs({
    step: "build",
  }),
);

Effect.runFork(runBuild);
