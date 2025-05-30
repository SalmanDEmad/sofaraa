{

    # php8.4-pgsql php8.4-sqlite3 php8.4-gd \
    # php8.4-curl php8.4-mongodb \
    # php8.4-imap php8.4-mysql php8.4-mbstring \
    # php8.4-xml php8.4-zip php8.4-bcmath php8.4-soap \
    # php8.4-intl php8.4-readline \
    # php8.4-ldap \
    # php8.4-msgpack php8.4-igbinary php8.4-redis php8.4-swoole \
    # php8.4-memcached php8.4-pcov php8.4-imagick php8.4-xdebug \
  description = "Laravel Development Environment";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs = { self, nixpkgs }:
    let
        system = builtins.currentSystem;
        pkgs = import nixpkgs { inherit system; };

    in {

    devShells = {
      x86_64-linux = let
        pkgs = import nixpkgs {
          system = "x86_64-linux";
        };
      in {
        default = pkgs.mkShell {
          buildInputs = with pkgs; [
            php
            php84Packages.composer
            php84Extensions.xdebug
            php84Extensions.pcov
            php84Extensions.gd
            php84Extensions.curl
            php84Extensions.imap
            php84Extensions.mbstring
            php84Extensions.xml
            php84Extensions.zip
            php84Extensions.bcmath
            php84Extensions.soap
            php84Extensions.intl
            php84Extensions.readline
            php84Extensions.ldap
            php84Extensions.msgpack
            php84Extensions.igbinary
            php84Extensions.imagick
            nodejs
            yarn
            mkcert
            # mkcert -cert-file etc/certs/videoapp.test.pem -key-file etc/certs/videoapp.test.key.pem videoapp.test
          ];

          shellHook = ''
            echo "✅ Laravel environment ready!"
            echo "PHP: $(php -v | head -n 1)"
            echo "Node: $(node -v)"
            echo "Composer: $(composer --version)"
            echo "✅ Laravel environment ready!"
            echo "💡 Run './start.sh' to launch Nginx + PHP-FPM"
            echo "🔒 Make sure your certs are in ./certs/"
            echo "👉 To start up everything with your local config, run:"
            echo "./start.sh"
          '';
        };
      };
    };
  };
}