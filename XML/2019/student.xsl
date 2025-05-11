<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet 
    version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <!-- Identity/Cleanup template (optional) -->
  <!-- <xsl:output method="html" indent="yes"/> -->

  <!-- Match the root and produce an HTML page -->
  <xsl:template match="/student">
    <html>
      <head>
        <title>Student Information</title>
        <style>
          table { border-collapse: collapse; width: 50%; }
          th, td { border: 1px solid #aaa; padding: 6px; }
          th { background: #ddd; text-align: left; }
        </style>
      </head>
      <body>
        <h2>Student Information</h2>
        <table>
          <tr>
            <th>Name</th>
            <td><xsl:value-of select="name"/></td>
          </tr>
          <tr>
            <th>Addresses</th>
            <td>
              <xsl:for-each select="address">
                <div>
                  <b><xsl:value-of select="@type"/>:</b>
                  <xsl:value-of select="normalize-space(.)"/>
                </div>
              </xsl:for-each>
            </td>
          </tr>
          <tr>
            <th>Phone</th>
            <td><xsl:value-of select="phone"/></td>
          </tr>
          <tr>
            <th>Website</th>
            <td>
              <a href="{website}">
                <xsl:value-of select="website"/>
              </a>
            </td>
          </tr>
        </table>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>
