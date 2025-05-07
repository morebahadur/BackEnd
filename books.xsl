<?xml version="1.0"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:h="http://www.w3.org/TR/html4/"
  xmlns:f="https://www.w3schools.com/furniture"
  exclude-result-prefixes="h f">

  <xsl:template match="/">
    <html>
      <body>
        <h2>Fruit Table</h2>
        <ul>
          <xsl:for-each select="root/h:table/h:tr/h:td">
            <li><xsl:value-of select="."/></li>
          </xsl:for-each>
        </ul>

        <h2>Furniture Info</h2>
        <ul>
          <li>Name: <xsl:value-of select="root/f:table/f:name"/></li>
          <li>Width: <xsl:value-of select="root/f:table/f:width"/></li>
          <li>Length: <xsl:value-of select="root/f:table/f:length"/></li>
        </ul>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
