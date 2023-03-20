{ pkgs }: {
	deps = [
		pkgs.nano
  pkgs.ffmpeg.bin
  pkgs.sudo
  pkgs.nodejs-18_x
    pkgs.nodePackages.typescript-language-server
    pkgs.yarn
    pkgs.replitPackages.jest
	];
}