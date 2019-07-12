{ mkYarnPackage }:
mkYarnPackage {
  name = "muellshack";
  src = ./.;
  packageJSON = ./package.json;
  yarnLock = ./yarn.lock;
  yarnNix = ./yarn.nix;
}
