irm get.scoop.sh -outfile 'install.ps1'
.\install.ps1 -RunAsAdmin [-OtherParameters ...]
# I don't care about other parameters and want a one-line command
iex "& {$(irm get.scoop.sh)} -RunAsAdmin"


.\install.ps1 -ScoopDir 'c:\Applications\Scoop' -ScoopGlobalDir 'F:\GlobalScoopApps' -NoProxy